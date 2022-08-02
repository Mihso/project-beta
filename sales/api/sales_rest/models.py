from django.db import models
from django.urls import reverse
# Create your models here.

class AutomobileVO(models.Model):
    sold = models.BooleanField(null=False, default=False)
    vin = models.TextField()

    def get_api_url(self):
        return reverse("api_AutomobileVO", kwargs={"pk": self.id})

class salesPerson(models.Model):
    name = models.CharField(max_length= 100)
    employeeNumber = models.PositiveBigIntegerField(unique=True)
    
    def get_api_url(self):
        return reverse("salesPerson/", kwargs={"pk": self.id})


class customer(models.Model):
    name= models.CharField(max_length=100)
    address= models.TextField()
    phoneNumber = models.PositiveBigIntegerField()

    def get_api_url(self):
        return reverse("customers/", kwargs={"pk": self.id})

class sales(models.Model):
    price = models.FloatField()
    auto = models.ForeignKey(
        "AutomobileVO",
        related_name="sales",
        on_delete=models.CASCADE,
        default=1,
    )
    person = models.ForeignKey(
        "salesPerson",
        related_name="sales",
        on_delete=models.CASCADE,
        default=1,
    )
    customer = models.ForeignKey(
        "customer",
        related_name="sales",
        on_delete=models.CASCADE,
        default=1,
    )

    def get_api_url(self):
        return reverse("sales/", kwargs={"pk": self.id})
