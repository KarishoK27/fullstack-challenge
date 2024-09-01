from api.models import Property
from api.test.factories import PropertyFactory
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class PropertyViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.property = PropertyFactory.build()
        self.property.save()

    def test_list_properties(self):
        self.client.force_login(user=self.user)
        response = self.client.get(reverse("property-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        count = Property.objects.all().count()
        self.assertEqual(len(response.data), count)

    def test_authentication_required(self):
        response = self.client.get(reverse("property-list"))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
