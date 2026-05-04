from django.urls import path
from . import views

urlpatterns = [
    path('quote/', views.QuoteView.as_view(), name='quote'),
    path('bookings/', views.BookingCreateView.as_view(), name='booking-create'),
    path('bookings/list/', views.BookingListView.as_view(), name='booking-list'),
    path('bookings/<uuid:pk>/', views.BookingDetailView.as_view(), name='booking-detail'),
]