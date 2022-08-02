from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    sold = models.BooleanField(null= False)
    vin = models.PositiveIntegerField()

class salesPerson(models.Model):
    name = models.CharField(max_length= 100)
    employeeNumber = models.PositiveIntegerField()

class customer(models.Model):
    name= models.CharField(max_length=100)
    address= models.TextField()
    phoneNumber = models.PositiveIntegerField()

class sales(models.Model):
    price = models.FloatField()
    # auto = models.ForeignKey(
    #     "AutomobileVO",
    #     related_name="sales",
    #     on_delete=models.CASCADE,
    # )
    # person = models.ForeignKey(
    #     "salesPerson",
    #     related_name="sales",
    #     on_delete=models.CASCADE,
    # )
    # customer = models.ForeignKey(
    #     "customer",
    #     related_name="sales",
    #     on_delete=models.CASCADE,
    # )
