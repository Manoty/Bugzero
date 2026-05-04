from rest_framework import serializers
from .models import ServiceCategory, Service, Testimonial


class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Service
        fields = [
            'id', 'name', 'slug', 'description',
            'property_type', 'pest_type',
            'price_min', 'price_max', 'unit',
            'category', 'category_name',
            'is_active', 'order',
        ]


class ServiceCategorySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'slug', 'description', 'icon', 'order', 'services']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'author_name', 'role', 'content', 'rating', 'is_featured']