from django.db import models
from django.urls import reverse
# Create your models here.

class AutomobileVO(models.Model):
    vin = models.TextField()
    returning = models.BooleanField(null=False, default= False)

    def get_api_url(self):
        return reverse("api_AutomobileVO", kwargs={"pk": self.vin})


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employeeNumber = models.PositiveBigIntegerField(unique = True)

    def get_api_url(self):
        return reverse("technician/", kwargs={"pk": self.id})


class Appointments(models.Model):
    vin = models.TextField()
    owner = models.CharField(max_length=100)
    date = models.DateTimeField()
    time = models.TimeField()
    auto = models.OneToOneField(
        "AutomobileVO",
        related_name="services",
        on_delete=models.CASCADE,
    )
    technician = models.ForeignKey(
        "technician",
        related_name="services",
        on_delete=models.CASCADE,
    )

    reason = models.CharField(max_length=100)

    def get_api_url(self):
            return reverse("appointments/", kwargs={"pk": self.id})


class Service(models.Model):
    vin = models.TextField()
    owner = models.CharField(max_length=100)
    date = models.DateTimeField()
    technician = models.CharField(max_length=100)
    reason = models.CharField(max_length=200)
    

