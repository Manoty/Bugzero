from rest_framework import serializers
from .models import QuoteRequest, Booking
from .pricing import calculate_quote


class QuoteRequestSerializer(serializers.ModelSerializer):
    estimated_min = serializers.IntegerField(read_only=True)
    estimated_max = serializers.IntegerField(read_only=True)
    breakdown = serializers.SerializerMethodField()

    class Meta:
        model = QuoteRequest
        fields = [
            'id', 'service', 'property_type', 'pest_type',
            'size_label', 'size_value', 'urgency',
            'estimated_min', 'estimated_max', 'breakdown',
            'created_at',
        ]
        read_only_fields = ['id', 'estimated_min', 'estimated_max', 'created_at']

    def get_breakdown(self, obj):
        return {
            'base_min': obj.estimated_min,
            'base_max': obj.estimated_max,
            'urgency': obj.urgency,
        }

    def validate(self, data):
        # Resolve service_key from service slug or pest_type
        service = data.get('service')
        property_type = data.get('property_type')
        size_value = data.get('size_value')
        urgency = data.get('urgency', 'normal')

        if service:
            service_key = service.slug.replace('-', '_')
        elif data.get('pest_type'):
            service_key = data['pest_type'].lower().replace(' ', '_')
        else:
            raise serializers.ValidationError("Provide either a service or pest_type.")

        try:
            result = calculate_quote(
                property_type=property_type,
                service_key=service_key,
                urgency=urgency,
                size_value=float(size_value) if size_value else None,
            )
        except ValueError as e:
            raise serializers.ValidationError(str(e))

        data['estimated_min'] = result['estimated_min']
        data['estimated_max'] = result['estimated_max']
        return data


class BookingSerializer(serializers.ModelSerializer):
    reference = serializers.CharField(read_only=True)
    service_name = serializers.CharField(source='service.name', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'reference',
            'service', 'service_name', 'quote',
            'customer_name', 'phone', 'email', 'location',
            'preferred_date', 'preferred_time',
            'urgency', 'notes',
            'status', 'status_display', 'admin_notes',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'reference', 'status', 'admin_notes', 'created_at', 'updated_at']


class BookingAdminSerializer(BookingSerializer):
    """Extended serializer for admin — allows status and admin_notes updates."""

    class Meta(BookingSerializer.Meta):
        read_only_fields = ['id', 'reference', 'created_at']