from django.contrib import admin

from .models import Property


class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        "full_address",
        "lon",
        "lat",
        "estimated_market_value",
        "bldg_use",
        "building_sq_ft",
    )


admin.site.register(Property, PropertyAdmin)
