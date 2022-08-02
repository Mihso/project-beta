from django.urls import path
from .views import salesList, sales_delete, customerList, salesPersonList

urlpatterns = [
    path('sales/', salesList, name="list_sales"),
    path('sales/<int:pk>/', sales_delete, name="delete_sales"),
    path('customers/', customerList, name="list_customers"),
    path('salesPerson/', salesPersonList, name="list_sales_people")
]