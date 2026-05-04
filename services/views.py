from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import ServiceCategory, Service, Testimonial
from .serializers import ServiceCategorySerializer, ServiceSerializer, TestimonialSerializer


class ServiceCategoryListView(generics.ListAPIView):
    queryset = ServiceCategory.objects.prefetch_related('services').all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]


class ServiceListView(generics.ListAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = Service.objects.filter(is_active=True).select_related('category')
        property_type = self.request.query_params.get('type')
        if property_type:
            qs = qs.filter(property_type__in=[property_type, 'both'])
        return qs


class ServiceDetailView(generics.RetrieveAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


class TestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.filter(is_featured=True)
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]