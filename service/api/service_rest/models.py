from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    vin = models.PositiveIntegerField()
    returning = models.BooleanField(null=False, default= False)

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employeeNumber = models.PositiveBigIntegerField(unique = True)

class ServiceAppointment(models.Model):
    vin = models.PositiveIntegerField()
    owner = models.CharField(max_length=100)
    date = models.DateTimeField()
    technician = models.CharField(max_length=100)
    reason = models.CharField(max_length=200)


class ListAppointments(models.Model):
    vin = models.PositiveIntegerField()
    owner = models.CharField(max_length=100)
    date = models.DateTimeField()
    technician = models.CharField()