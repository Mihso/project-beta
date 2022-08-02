from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    sold = models.BooleanField(null=False, default=False)
    vin = models.TextField()

class salesPerson(models.Model):
    name = models.CharField(max_length= 100)
    employeeNumber = models.PositiveBigIntegerField(unique=True)

class customer(models.Model):
    name= models.CharField(max_length=100)
    address= models.TextField()
    phoneNumber = models.PositiveBigIntegerField()

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
