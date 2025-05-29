from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ['email', 'username', 'subscription_status', 'is_staff']
    list_filter = ['subscription_status', 'is_staff', 'is_active']
    search_fields = ['email', 'username']
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Stripe Info', {'fields': ('stripe_customer_id', 'stripe_subscription_id', 'subscription_status', 'trial_ends_at')}),
    )