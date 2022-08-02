from django.shortcuts import render

# Create your views here.
from .models import sales, salesPerson, AutomobileVO, customer
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

# Create your views here.
class AutoMobileEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
        "sold",
    ]

class SalePersonEncoder(ModelEncoder):
    model = salesPerson
    properties = [
        "name",
        "employeeNumber",
    ]

class customerEncoder(ModelEncoder):
    model = customer
    properties = [
        "name",
        "address",
        "phoneNumber",
    ]

class salesEncoder(ModelEncoder):
    model = sales
    properties= [
        "price"
    ]
    # encoders ={
    #     'auto': AutoMobileEncoder(),
    #     'person': SalePersonEncoder(),
    #     'customer': customerEncoder(),
    # }

@require_http_methods(["GET", "POST", "DELETE"])
def salesList(request):
    if request.method == "GET":
        salt = sales.objects.all()
        return JsonResponse(
            {"sales": salt},
            encoder = salesEncoder,
        )
    else:
        content = json.loads(request.body)
        # try:
        #     auto = content["auto"]
        #     result =AutomobileVO.objects.get(id=auto)
        #     content["auto"] = result
        # except AutomobileVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid Automoblie"},
        #         status=400
        #     )
        # try:
        #     person = content["person"]
        #     result =salesPerson.objects.get(id=person)
        #     content["person"] = result
        # except salesPerson.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid Sales Person"},
        #         status=400
        #     )
        # try:
        #     potentcustomer = content["customer"]
        #     result = customer.objects.get(id=potentcustomer)
        #     content["customer"] = result
        # except AutomobileVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid Customer"},
        #         status=400
        #     )
        shoe = sales.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=salesEncoder,
            safe=False,
        )
@require_http_methods(["DELETE", 'GET'])
def sales_delete(request, pk):
    if request.method == "DELETE":
        count, _ = sales.objects.all().delete()
        return JsonResponse({"deleted": count > 0})