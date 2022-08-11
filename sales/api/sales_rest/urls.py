from django.urls import path
from .views import salesList, sales_delete, customerList, salesPersonList,customer_delete, salesPerson_delete
urlpatterns = [
    path('sales/', salesList, name="list_sales"),
    path('sales/<int:pk>/', sales_delete, name="delete_sales"),
    path('customers/', customerList, name="list_customers"),
    path('customers/<int:pk>/', customer_delete, name="delete_customer"),
    path('salesPerson/', salesPersonList, name="list_sales_people"),
    path('salesPerson/<int:num>/',salesPerson_delete, name= "delte_salesPerson")
]