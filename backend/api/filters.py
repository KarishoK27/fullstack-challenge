from api.models import Property
from django_filters import rest_framework as filters


class PropertyFilter(filters.FilterSet):
    class Meta:
        model = Property
        fields = {
            "bldg_use": ["exact"],
            "estimated_market_value": ["gte", "lte"],
            "building_sq_ft": ["gte", "lte"],
        }
