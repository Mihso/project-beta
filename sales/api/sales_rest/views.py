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
        "id",
        "address",
        "phoneNumber",
    ]

class salesEncoder(ModelEncoder):
    model = sales
    properties= [
        "price",
        "auto",
        "person",
        "customer",
        "id"
    ]
    encoders ={
        'auto': AutoMobileEncoder(),
        'person': SalePersonEncoder(),
        'customer': customerEncoder(),
    }

@require_http_methods(["GET", "POST"])
def salesList(request):
    if request.method == "GET":
        saleVariable = sales.objects.all()
        return JsonResponse(
            {"sales": saleVariable},
            encoder = salesEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            auto = content["auto"]
            result =AutomobileVO.objects.get(vin=auto)
            content["auto"] = result
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Automoblie"},
                status=400
            )
        try:
            person = content["person"]
            result =salesPerson.objects.get(employeeNumber=person)
            content["person"] = result
        except salesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Sales Person"},
                status=400
            )
        try:
            potentcustomer = content["customer"]
            result = customer.objects.get(id=potentcustomer)
            content["customer"] = result
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer"},
                status=400
            )
        shoe = sales.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=salesEncoder,
            safe=False,
        )
@require_http_methods(["DELETE", 'GET', 'PUT'])
def sales_delete(request, pk):
    if request.method == "GET":
        saleGet = sales.objects.get(id=pk)
        return JsonResponse(
            saleGet,
            encoder = salesEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = sales.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        try:
            content = json.loads(request.body)
            salesPut = sales.objects.get(id=pk)

            props = ["price"]
            for prop in props:
                if prop in content:
                    setattr(salesPut, prop, content[prop])
            salesPut.save()
            return JsonResponse(
                salesPut,
                encoder=salesEncoder,
                safe=False,
            )
        except sales.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def customerList(request):
    if request.method == "GET":
        cust = customer.objects.all()
        return JsonResponse(
            {"customers": cust},
            encoder = customerEncoder,
        )
    else:
        content = json.loads(request.body)
        shoe = customer.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=customerEncoder,
            safe=False,
        )
@require_http_methods(["DELETE", 'PUT','GET'])
def customer_delete(request, pk):
    if request.method == "GET":
        custom = customer.objects.get(id=pk)
        return JsonResponse(
            custom,
            encoder = customerEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = customer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        try:
            content = json.loads(request.body)
            custom = customer.objects.get(id = pk)

            props = ["name","address", "phoneNumber"]
            for prop in props:
                if prop in content:
                    setattr(custom, prop, content[prop])
            custom.save()
            return JsonResponse(
                custom,
                encoder=customerEncoder,
                safe=False,
            )
        except customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def salesPersonList(request):
    if request.method == "GET":
        SP = salesPerson.objects.all()
        return JsonResponse(
            {"salesPeople": SP},
            encoder = SalePersonEncoder,
        )
    else:
        content = json.loads(request.body)
        shoe = salesPerson.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=SalePersonEncoder,
            safe=False,
        )
@require_http_methods(["DELETE", 'PUT', 'GET'])
def salesPerson_delete(request, num):
    if request.method == "GET":
        SP = salesPerson.objects.get(employeeNumber=num)
        return JsonResponse(
            SP,
            encoder = SalePersonEncoder,
            safe = False,
        )
    elif request.method == "DELETE":
        count, _ = salesPerson.objects.filter(employeeNumber=num).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        try:
            content = json.loads(request.body)
            salesP = salesPerson.objects.get(employeeNumber = num)

            props = ["name","employeeNumber"]
            for prop in props:
                if prop in content:
                    setattr(salesP, prop, content[prop])
            salesP.save()
            return JsonResponse(
                salesP,
                encoder=SalePersonEncoder,
                safe=False,
            )
        except salesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response