from django.urls import path
from .views import serviceList, serviceDelete, appointmentList, technicianList

urlpatterns = [
    path('service/', serviceList, name="list_services"),
    path('service/<ink:pk>/', serviceDelete, name="delete_services"),
    path('appointments/', appointmentList, name="list_appointments"),
    path('technicianList/',technicianList, name="list_technicians")
]
