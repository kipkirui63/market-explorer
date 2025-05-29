from django.urls import path
from . import views

urlpatterns = [
    path('orders/', views.orders_list, name='orders_list'),
    path('create-payment-intent/', views.create_payment_intent, name='create_payment_intent'),
    path('create-invoice/', views.create_invoice, name='create_invoice'),
    path('webhook/', views.webhook_handler, name='webhook_handler'),
    path('agent-access/<str:agent_id>/', views.agent_access, name='agent_access'),
]