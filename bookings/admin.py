from django.contrib import admin
from .models import QuoteRequest, Booking


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ['id', 'property_type', 'pest_type', 'urgency', 'estimated_min', 'estimated_max', 'created_at']
    list_filter = ['property_type', 'urgency']
    readonly_fields = ['estimated_min', 'estimated_max', 'created_at']


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['reference', 'customer_name', 'phone', 'service', 'preferred_date', 'urgency', 'status', 'created_at']
    list_filter = ['status', 'urgency', 'service']
    list_editable = ['status']
    search_fields = ['customer_name', 'phone', 'email', 'location']
    readonly_fields = ['id', 'reference', 'created_at', 'updated_at']

    fieldsets = (
        ('Customer', {'fields': ('customer_name', 'phone', 'email', 'location')}),
        ('Service', {'fields': ('service', 'quote', 'urgency', 'preferred_date', 'preferred_time', 'notes')}),
        ('Admin', {'fields': ('status', 'admin_notes')}),
        ('Meta', {'fields': ('id', 'reference', 'created_at', 'updated_at')}),
    )