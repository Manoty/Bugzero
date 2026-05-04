from django.urls import path
from . import views

urlpatterns = [
    path('services/', views.ServiceListView.as_view(), name='service-list'),
    path('services/categories/', views.ServiceCategoryListView.as_view(), name='category-list'),
    path('services/<slug:slug>/', views.ServiceDetailView.as_view(), name='service-detail'),
    path('testimonials/', views.TestimonialListView.as_view(), name='testimonial-list'),
]