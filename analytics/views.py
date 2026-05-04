from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.db.models import Count, Q
from django.utils import timezone
from datetime import timedelta

from bookings.models import Booking, QuoteRequest


class AnalyticsSummaryView(APIView):
    """GET /api/analytics/ — Admin only. Dashboard summary stats."""
    permission_classes = [IsAdminUser]

    def get(self, request):
        now = timezone.now()
        thirty_days_ago = now - timedelta(days=30)
        seven_days_ago = now - timedelta(days=7)

        bookings = Booking.objects.all()

        # Status breakdown
        status_counts = bookings.values('status').annotate(count=Count('id'))
        status_map = {s['status']: s['count'] for s in status_counts}

        # Recent activity
        recent_bookings = bookings.filter(created_at__gte=seven_days_ago).count()
        monthly_bookings = bookings.filter(created_at__gte=thirty_days_ago).count()

        # Quotes generated
        total_quotes = QuoteRequest.objects.count()
        recent_quotes = QuoteRequest.objects.filter(created_at__gte=seven_days_ago).count()

        # Conversion rate (quotes that became bookings)
        conversion_rate = 0
        if total_quotes > 0:
            bookings_with_quote = bookings.filter(quote__isnull=False).count()
            conversion_rate = round((bookings_with_quote / total_quotes) * 100, 1)

        # Top services
        top_services = (
            bookings.values('service__name')
            .annotate(count=Count('id'))
            .order_by('-count')[:5]
        )

        return Response({
            'totals': {
                'bookings': bookings.count(),
                'quotes': total_quotes,
                'conversion_rate_percent': conversion_rate,
            },
            'status_breakdown': status_map,
            'recent': {
                'bookings_last_7_days': recent_bookings,
                'bookings_last_30_days': monthly_bookings,
                'quotes_last_7_days': recent_quotes,
            },
            'top_services': list(top_services),
        })