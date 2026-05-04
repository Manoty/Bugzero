import uuid
from django.db import models


class ServiceCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True, help_text="Icon name e.g. 'bug', 'home'")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Service Categories'

    def __str__(self):
        return self.name


class Service(models.Model):
    PROPERTY_TYPE_CHOICES = [
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('both', 'Both'),
    ]
    UNIT_CHOICES = [
        ('flat', 'Flat Rate'),
        ('per_sqm', 'Per Square Metre'),
        ('per_ton', 'Per Ton'),
        ('per_month', 'Per Month'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.CASCADE, related_name='services'
    )
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPE_CHOICES)
    pest_type = models.CharField(max_length=100, blank=True)
    price_min = models.DecimalField(max_digits=10, decimal_places=2)
    price_max = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=20, choices=UNIT_CHOICES, default='flat')
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author_name = models.CharField(max_length=100)
    role = models.CharField(max_length=150, help_text="e.g. Homeowner, Nairobi")
    content = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_featured', '-created_at']

    def __str__(self):
        return f"{self.author_name} — {self.rating}★"