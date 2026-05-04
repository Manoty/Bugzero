import uuid
from django.db import models
from services.models import Service


class QuoteRequest(models.Model):
    URGENCY_CHOICES = [
        ('normal', 'Normal'),
        ('weekend', 'Weekend'),
        ('emergency', 'Emergency'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    service = models.ForeignKey(
        Service, on_delete=models.SET_NULL, null=True, related_name='quotes'
    )
    property_type = models.CharField(max_length=20)
    pest_type = models.CharField(max_length=100, blank=True)
    size_label = models.CharField(max_length=100, blank=True, help_text="e.g. '2 Bedroom', '500 sqm'")
    size_value = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True,
        help_text="Numeric value: room count or sqm"
    )
    urgency = models.CharField(max_length=20, choices=URGENCY_CHOICES, default='normal')
    estimated_min = models.DecimalField(max_digits=10, decimal_places=2)
    estimated_max = models.DecimalField(max_digits=10, decimal_places=2)
    session_key = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Quote #{str(self.id)[:8]} — KES {self.estimated_min}–{self.estimated_max}"


class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    URGENCY_CHOICES = [
        ('normal', 'Normal'),
        ('weekend', 'Weekend'),
        ('emergency', 'Emergency'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    service = models.ForeignKey(
        Service, on_delete=models.SET_NULL, null=True, related_name='bookings'
    )
    quote = models.ForeignKey(
        QuoteRequest, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='bookings'
    )
    # Customer info
    customer_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    location = models.CharField(max_length=255, help_text="Area / estate / town")
    # Service details
    preferred_date = models.DateField()
    preferred_time = models.TimeField(null=True, blank=True)
    urgency = models.CharField(max_length=20, choices=URGENCY_CHOICES, default='normal')
    notes = models.TextField(blank=True, help_text="Customer notes")
    # Admin
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    admin_notes = models.TextField(blank=True)
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.customer_name} — {self.service} [{self.status}]"

    @property
    def reference(self):
        return f"FUM-{str(self.id)[:8].upper()}"