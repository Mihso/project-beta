from django.shortcuts import render
from .models import Appointments, Service, Technician, AutomobileVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json


# Create your views here.
class AutomobileEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "returning"]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employeeNumber",
    ]

class ServiceEncoder(ModelEncoder):
    model = Service
    properties = [
        "vin",
        "owner",
        "date"
        "technician",
        "reason",
    ]
class AppointmentsEncoder(ModelEncoder):
    model = Appointments
    properties =[
        "owner",
        "date",
        "auto",
        "id",
        #"time",
        "technician",
        "reason",
    ]
    encoders={
        'auto': AutomobileEncoder(),
        'technician': TechnicianEncoder(),
    }

@require_http_methods(["GET", "POST", "DELETE"])
def appointmentList(request):
    if request.method == "GET":
        appointment = Appointments.objects.all()
        return JsonResponse(
            {"appointments": appointment},
            encoder = AppointmentsEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            auto=content["auto"]
            result = AutomobileVO.objects.get(vin=auto)
            content["auto"] = result
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Automobile"},
                status= 400
            )
        try:
            technician = content["technician"]
            result = Technician.objects.get(employeeNumber=technician)
            content["technician"]=result
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician"},
                status=400
            )
        # try: 
        #     serviceNeeded = content["service"]
        #     result = Service.objects.get(id=serviceNeeded)
        #     content["service"] = result
        # except AutomobileVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid Service"},
        #         status=400
        #     )
        appointment = Appointments.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentsEncoder,
            safe=False,
        )
@require_http_methods(["DELETE", "GET"])
def serviceDelete(request, pk):
    if request.method=="DELETE":
        count,= Service.objects.all().delete()
        return JsonResponse({"deleted": count > 0})

# @require_http_methods(["GET", "POST", "DELETE"])
# def appointmentList(request):
#     if request.method=="GET":
#         appt = Appointments.objects.all()
#         return JsonResponse(
#             {"service": appt},
#             encoder = AppointmentsEncoder
#         )
#     else:
#         content = json.loads(request.body)
#         shoe = Appointments.objects.create(**content)
#         return JsonResponse(
#             appt,
#             encoder =AppointmentsEncoder,
#             safe=False,
#         )

@require_http_methods(["DELETE", "GET"])
def appointmentDelete(request, pk):
    if request.method =="DELETE":
        count, _= Appointments.objects.all().deleted()
        return JsonResponse({"deleted": count >0})

@require_http_methods(["GET", "POST", "DELETE"])
def technicianList(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            {"technician": technician},
            encoder = TechnicianEncoder
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )


@require_http_methods(["DELETE", "GET"])
def technicianDelete(request, pk):
    if request.method == "DELETE":
        count, _=Technician.objects.all().delete()
        return JsonResponse({"deleted": count > 0})


