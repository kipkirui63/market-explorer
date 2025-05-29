from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer, CreateOrderSerializer
import stripe
from django.conf import settings
import json

stripe.api_key = settings.STRIPE_SECRET_KEY


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def orders_list(request):
    orders = Order.objects.filter(user=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_payment_intent(request):
    try:
        amount = request.data.get('amount')
        cart_items = request.data.get('cartItems', [])
        
        # Create payment intent
        intent = stripe.PaymentIntent.create(
            amount=int(float(amount) * 100),  # Convert to cents
            currency='usd',
            metadata={
                'user_id': request.user.id,
                'cart_items': json.dumps(cart_items)
            }
        )
        
        return Response({
            'client_secret': intent.client_secret,
            'payment_intent_id': intent.id
        })
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_invoice(request):
    try:
        cart_items = request.data.get('cartItems', [])
        amount = request.data.get('amount')
        
        # Create order record
        order_data = {
            'total_amount': amount,
            'items': cart_items
        }
        serializer = CreateOrderSerializer(data=order_data)
        if serializer.is_valid():
            order = serializer.save(user=request.user)
            
            return Response({
                'order_id': order.id,
                'message': 'Order created successfully'
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def webhook_handler(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        return Response({'error': 'Invalid payload'}, status=400)
    except stripe.error.SignatureVerificationError:
        return Response({'error': 'Invalid signature'}, status=400)
    
    # Handle the event
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        # Update order status
        try:
            order = Order.objects.get(
                stripe_payment_intent_id=payment_intent['id']
            )
            order.status = 'paid'
            order.save()
        except Order.DoesNotExist:
            pass
    
    return Response({'status': 'success'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def agent_access(request, agent_id):
    # Check if user has access to the specific agent
    user = request.user
    has_access = user.subscription_status in ['active', 'trialing']
    
    return Response({
        'hasAccess': has_access,
        'agentId': agent_id
    })