from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('user/', views.user_view, name='user'),
    path('create-subscription/', views.create_subscription, name='create_subscription'),
    path('subscription-access/', views.subscription_access, name='subscription_access'),
]