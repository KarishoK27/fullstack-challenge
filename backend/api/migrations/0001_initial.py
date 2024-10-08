# Generated by Django 5.1 on 2024-08-30 19:35

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Property",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("full_address", models.CharField(max_length=200)),
                ("lon", models.FloatField()),
                ("lat", models.FloatField()),
                ("class_description", models.TextField()),
                ("estimated_market_value", models.IntegerField()),
                ("bldg_use", models.CharField(max_length=100)),
                ("building_sq_ft", models.IntegerField()),
            ],
        ),
    ]
