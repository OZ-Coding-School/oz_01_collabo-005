from django.test import TestCase
from django.urls import reverse

from app.category.models import Category
from app.user.models import User


class CategoryModelTests(TestCase):
    def setUp(self) -> None:
        email = "category@test.com"
        password = "aelsfselfflefjla"
        self.user = User.objects.create(email=email, password=password)
        self.client.force_login(self.user)
        self.category = Category.objects.create(name="category")

    def test_get_all_categories(self) -> None:
        url = reverse("category-list")
        res = self.client.get(url)
        self.assertEqual(res.status_code, 200)

    def test_get_a_category_by_id(self) -> None:
        url = reverse("category-detail", kwargs={"pk": self.category.pk})
        res = self.client.get(url)
        data = res.json()
        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["name"] == self.category.name)
