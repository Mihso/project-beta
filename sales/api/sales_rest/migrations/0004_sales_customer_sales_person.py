# Generated by Django 4.0.3 on 2022-08-02 04:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0003_sales_auto'),
    ]

    operations = [
        migrations.AddField(
            model_name='sales',
            name='customer',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='sales', to='sales_rest.customer'),
        ),
        migrations.AddField(
            model_name='sales',
            name='person',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='sales', to='sales_rest.salesperson'),
        ),
    ]