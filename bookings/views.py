from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import QuoteRequest, Booking
from .serializers import (
    QuoteRequestSerializer,
    BookingSerializer,
    BookingAdminSerializer,
)
from .pricing import calculate_quote


class QuoteView(APIView):
    """
    POST /api/quote/
    Accepts pricing inputs, returns estimated cost range.
    Optionally persists the quote for analytics.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        property_type = request.data.get('property_type')
        service_key = request.data.get('service_key')
        urgency = request.data.get('urgency', 'normal')
        size_value = request.data.get('size_value')
        include_inspection = request.data.get('include_inspection', False)

        if not property_type or not service_key:
            return Response(
                {'error': 'property_type and service_key are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            result = calculate_quote(
                property_type=property_type,
                service_key=service_key,
                urgency=urgency,
                size_value=float(size_value) if size_value else None,
                include_inspection=include_inspection,
            )
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            **result,
            'inputs': {
                'property_type': property_type,
                'service_key': service_key,
                'urgency': urgency,
                'size_value': size_value,
            }
        }, status=status.HTTP_200_OK)


class BookingCreateView(generics.CreateAPIView):
    """POST /api/bookings/ — Public. Creates a new booking (lead capture)."""
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save()


class BookingListView(generics.ListAPIView):
    """GET /api/bookings/ — Admin only. Lists all bookings with filters."""
    queryset = Booking.objects.select_related('service', 'quote').all()
    serializer_class = BookingAdminSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'urgency', 'service']
    search_fields = ['customer_name', 'phone', 'email', 'location']
    ordering_fields = ['created_at', 'preferred_date', 'status']
    ordering = ['-created_at']


class BookingDetailView(generics.RetrieveUpdateAPIView):
    """GET/PATCH /api/bookings/{id}/ — Admin only."""
    queryset = Booking.objects.select_related('service', 'quote').all()
    serializer_class = BookingAdminSerializer
    permission_classes = [IsAdminUser]