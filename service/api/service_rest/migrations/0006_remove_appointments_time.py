# Generated by Django 4.0.3 on 2022-08-05 01:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0005_alter_appointments_technician'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointments',
            name='time',
        ),
    ]