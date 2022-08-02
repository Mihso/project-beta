from django.shortcuts import render
from .models import ListAppointments, ServiceAppointment, Technician, AutomobileVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json


# Create your views here.
class AutomobileEncoder(ModelEncoder):
    