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
        "vin",
        "owner",
        "date",
        "time",
        "technician"
        "reason",
    ]
    encoders={
        'auto': AutomobileEncoder(),
        'person': TechnicianEncoder(),
        'service': ServiceEncoder(),
    }

@require_http_methods(["GET", "POST", "DELETE"])
def serviceList(request):
    if request.method == "GET":
        serv = service.objects.all()
        return JsonResponse(
            {"services": serv},
            encoder = ServiceEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            auto=content["auto"]
            result = AutomobileVO.objects.get(id=auto)
            content["auto"] = result
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Automobile"},
                status= 400
            )
        try:
            person = content["person"]
            result = Technician.objects.get(employeeNumber=person)
            content["person"]=result
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician"},
                status=400
            )
        try: 
            serviceNeeded = content["service"]
            result = Service.objects.get(id=serviceNeeded)
            content["service"] = result
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Service"},
                status=400
            )
        service = Service.objects.create(**content)
        return JsonResponse(
            service,
            encoder=ServiceEncoder,
            safe=False,
        )
@require_http_methods(["DELETE", "GET"])
def serviceDelete(request, pk):
    if request.method=="DELETE":
        count,= Service.objects.all().delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET", "POST", "DELETE"])
def appointmentList(request):
    if request.method=="GET":
        appt = Appointments.objects.all()
        return JsonResponse(
            {"service": appt},
            encoder = AppointmentsEncoder
        )
    else:
        content = json.loads(request.body)
        shoe = Appointments.objects.create(**content)
        return JsonResponse(
            appt,
            encoder =AppointmentsEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET"])
def appointmentDelete(request, pk):
    if request.method =="DELETE":
        count, _= Appointments.objects.all().deleted()
        return JsonResponse({"deleted": count >0})

@require_http_methods(["GET", "POST", "DELETE"])
def technicianList(request):
    if request.method == "GET":
        tech = Technician.objects.all()
        return JsonResponse(
            {"technician": tech},
            encoder = TechnicianEncoder
        )
    else:
        content = json.loads(request.body)
        tech = Technician.objects.create(**content)
        return JsonResponse(
            tech,
            encoder=TechnicianEncoder,
            safe=False
        )


@require_http_methods(["DELETE", "GET"])
def technicianDelete(request, pk):
    if request.method == "DELETE":
        count, _=Technician.objects.all().delete()
        return JsonResponse({"deleted": count > 0})
