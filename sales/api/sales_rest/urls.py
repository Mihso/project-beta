from django.urls import path
from .views import salesList, sales_delete

urlpatterns = [
    path('sales/', salesList, name="list_sales"),
    path('sales/<int:pk>/', sales_delete, name="delete_sales"),
]