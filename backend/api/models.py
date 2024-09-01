from django.db import models


class Property(models.Model):
    full_address = models.CharField(max_length=200)
    lon = models.FloatField()
    lat = models.FloatField()
    class_description = models.TextField()
    estimated_market_value = models.IntegerField()
    bldg_use = models.CharField(max_length=100)
    building_sq_ft = models.IntegerField()

    class Meta:
        verbose_name_plural = "Properties"
