# Generated by Django 4.0.3 on 2022-08-04 22:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0004_alter_appointments_auto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointments',
            name='technician',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='services', to='service_rest.technician'),
        ),
    ]
