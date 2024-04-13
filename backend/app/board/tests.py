from django.test import TestCase
from django.urls import reverse

from app.board.views import PostViewSet
from app.category.models import Category
from app.club.models import Club
from app.user.models import User


class BoardModelTest(TestCase):
    def setUp(self) -> None:
        email = "user@test.com"
        password = "aejflslefjla"
        self.user = User.objects.create(email=email, password=password)
        self.client.login(email=email, password=password)
        self.client.force_login(self.user)
        self.category = Category.objects.create(name="category")
        self.club = Club.objects.create(name="club", category=self.category, leader=self.user)
        self.url_post = reverse("post-list", kwargs={"club_id": self.club.id})
        self.url_schedule = reverse("schedule-list", kwargs={"club_id": self.club.id})

    def test_create_post_successfully(self) -> None:
        data = {"title": "test title", "content": "test"}
        res = self.client.post(self.url_post, data)
        self.assertEqual(res.status_code, 201)

    def test_create_post_without_title(self) -> None:
        data = {"content": "test content"}
        res = self.client.post(self.url_post, data)
        self.assertEqual(res.status_code, 400)

    def test_create_post_without_content(self) -> None:
        data = {"title": "test"}
        res = self.client.post(self.url_post, data)
        self.assertEqual(res.status_code, 400)

    def test_create_schedule_successfully(self) -> None:
        data = {
            "title": "test title",
            "content": "test",
            "event_time": "2024-04-30 13:51:00.000000",
            "place": "test place",
        }
        res = self.client.post(self.url_schedule, data)
        self.assertEqual(res.status_code, 201)
