# Generated by Django 4.0.3 on 2022-08-02 04:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_remove_customer_sales_remove_salesperson_sales'),
    ]

    operations = [
        migrations.AddField(
            model_name='sales',
            name='auto',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='sales', to='sales_rest.automobilevo'),
        ),
    ]
