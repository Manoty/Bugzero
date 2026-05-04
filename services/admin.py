from django.contrib import admin
from .models import ServiceCategory, Service, Testimonial


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'order']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'property_type', 'price_min', 'price_max', 'unit', 'is_active']
    list_filter = ['property_type', 'category', 'is_active']
    list_editable = ['is_active', 'order']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'pest_type']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'role', 'rating', 'is_featured']
    list_editable = ['is_featured']