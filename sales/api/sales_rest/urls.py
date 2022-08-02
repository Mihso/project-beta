from django.urls import path 
from .views import list_sales

urlpatterns = [
    path('sales/', list_sales, name="list_sales"),
]