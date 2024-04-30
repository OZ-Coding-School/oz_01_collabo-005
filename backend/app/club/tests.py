from django.test import TestCase
from django.urls import reverse

from app.category.models import Category
from app.user.models import User


class ClubModelTests(TestCase):
    def setUp(self) -> None:
        email = "user@test.com"
        password = "aejflslefjla"
        self.user = User.objects.create(email=email, password=password)
        self.client.force_login(self.user)
        self.category = Category.objects.create(name="category")

    def test_create_club_successfully(self) -> None:
        url = reverse("club-list")
        data = {"name": "test", "description": "test", "category": self.category.pk, "leader": self.user}
        res = self.client.post(url, data)
        self.assertEqual(res.status_code, 201)

    def test_create_club_without_name(self) -> None:
        url = reverse("club-list")
        data = {"description": "test", "category": self.category.pk, "leader": self.user}
        res = self.client.post(url, data)
        self.assertEqual(res.status_code, 400)

    def test_create_club_without_description(self) -> None:
        url = reverse("club-list")
        data = {"name": "test", "category": self.category.pk, "leader": self.user}
        res = self.client.post(url, data)
        self.assertEqual(res.status_code, 400)
