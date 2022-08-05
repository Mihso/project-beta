from django.urls import path
from .views import serviceDelete, appointmentList, technicianList, appointmentDelete, serviceList

urlpatterns = [
    path('service/', serviceList, name="list_services"),
    path('appointments/<int:pk>/', appointmentDelete, name="delete_appointments"),
    path('service/<int:pk>/', serviceDelete, name="delete_services"),
    path('appointments/', appointmentList, name="list_appointments"),
    path('technicianList/',technicianList, name="list_technicians")
]
