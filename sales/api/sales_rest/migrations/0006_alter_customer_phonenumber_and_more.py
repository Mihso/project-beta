# Generated by Django 4.0.3 on 2022-08-02 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0005_alter_automobilevo_vin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='phoneNumber',
            field=models.PositiveBigIntegerField(),
        ),
        migrations.AlterField(
            model_name='salesperson',
            name='employeeNumber',
            field=models.PositiveBigIntegerField(),
        ),
    ]
