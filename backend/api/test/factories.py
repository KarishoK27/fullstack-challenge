from api.models import Property
from factory.django import DjangoModelFactory
from factory.fuzzy import FuzzyFloat, FuzzyInteger, FuzzyText


class PropertyFactory(DjangoModelFactory):
    class Meta:
        model = Property

    full_address = FuzzyText(length=50)
    class_description = FuzzyText(length=30)
    estimated_market_value = FuzzyInteger(low=50000, high=5000000)
    building_sq_ft = FuzzyInteger(low=100, high=100000)
    lon = FuzzyFloat(low=-50, high=50)
    lat = FuzzyFloat(low=-50, high=50)
