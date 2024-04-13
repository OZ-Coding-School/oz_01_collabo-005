from django.test import TestCase
from django.urls import reverse


class UserModelTests(TestCase):
    def setUp(self) -> None:
        self.url = reverse("rest_register")

    def test_create_user_with_email_successful(self) -> None:
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
