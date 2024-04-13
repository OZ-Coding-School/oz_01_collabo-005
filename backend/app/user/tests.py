from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse


class UserModelTests(TestCase):
    def setUp(self) -> None:
        self.url = reverse("rest_register")

    def test_create_user_successful(self) -> None:
        # Given
        data = {
            "email": "user@email.com",
            "password1": "felsejfla234234",
            "password2": "felsejfla234234",
            "nickname": "nick",
            "nationality": "nationality",
            "first_name": "firstname",
            "last_name": "lastname",
            "phone": "1234",
            "date_of_birth": "2024-04-01",
            "profession": "profession",
        }
        # When
        res = self.client.post(self.url, data)
        # Then
        self.assertEqual(res.status_code, 201)

    def test_create_user_without_email(self) -> None:
        data = {
            "password1": "felsejfla234234",
            "password2": "felsejfla234234",
            "nickname": "nick",
            "nationality": "nationality",
            "first_name": "firstname",
            "last_name": "lastname",
            "phone": "1234",
            "date_of_birth": "2024-04-01",
            "profession": "profession",
        }
        res = self.client.post(self.url, data)
        self.assertEqual(res.status_code, 400)

    def test_create_user_with_different_password(self) -> None:
        data = {
            "password1": "felsejfla234234",
            "password2": "felse",
            "nickname": "nick",
            "nationality": "nationality",
            "first_name": "firstname",
            "last_name": "lastname",
            "phone": "1234",
            "date_of_birth": "2024-04-01",
            "profession": "profession",
        }
        res = self.client.post(self.url, data)
        self.assertEqual(res.status_code, 400)

    def test_create_superuser(self) -> None:
        email = "super@test.com"
        password = "sfjeljfaefasef"
        super_user = get_user_model().objects.create_superuser(email=email, password=password)
        self.assertEqual(super_user.email, email)
        self.assertTrue(super_user.is_superuser)
        self.assertTrue(super_user.is_staff)
        self.assertTrue(super_user.is_active)
