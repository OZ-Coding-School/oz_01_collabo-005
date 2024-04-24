from typing import Any

from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.utils import user_field
from django.utils.translation import gettext as _
from requests import Request
from rest_framework.exceptions import ValidationError

from app.user.models import User


class CustomAccountAdapter(DefaultAccountAdapter):  # type: ignore
    # def save_user(self, request: Request, user: Any, form: Any, commit: bool = False) -> Any:
    #     user = super().save_user(request, user, form, commit)
    #     data = form.cleaned_data
    #     user_field(user, "nickname", data.get("nickname"))
    #     user_field(user, "nationality", data.get("nationality"))
    #     user_field(user, "first_name", data.get("first_name"))
    #     user_field(user, "last_name", data.get("last_name"))
    #     user_field(user, "phone", data.get("phone"))
    #     user_field(user, "date_of_birth", data.get("date_of_birth"))
    #     user_field(user, "profession", data.get("profession"))
    #
    #     # user.nickname = data.get("nickname")
    #     # user.nationality = data.get("nickname")
    #     # user.first_name = data.get("first_name")
    #     # user.last_name = data.get("last_name")
    #     # user.phone = data.get("phone")
    #     # user.date_of_birth = data.get("date_of_birth")
    #     # user.profession = data.get("profession")
    #     user.save()
    #     return user

    def save_user(self, request: Request, user: Any, form: Any, commit: bool = True) -> Any:
        user = super().save_user(request, user, form, False)
        user_field(user, "nickname", request.data.get("nickname"))
        user_field(user, "nationality", request.data.get("nationality"))
        user_field(user, "first_name", request.data.get("first_name"))
        user_field(user, "last_name", request.data.get("last_name"))
        user_field(user, "phone", request.data.get("phone"))
        user_field(user, "date_of_birth", request.data.get("date_of_birth"))
        user_field(user, "profession", request.data.get("profession"))

        # password = form.cleaned_data.get("password1")
        # if password:
        #     user.set_password(password)

        user.save()
        return user

    def clean_email(self, email: str) -> str:
        if User.objects.filter(email=email).exists():
            raise ValidationError(_("This email is already in use."))
        return email
