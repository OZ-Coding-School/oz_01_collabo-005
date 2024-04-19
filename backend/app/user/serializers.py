from typing import Any

from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.request import Request
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.settings import api_settings

from app.user.models import User


class SignupSerializer(RegisterSerializer):  # type: ignore
    nickname = serializers.CharField()
    nationality = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phone = serializers.CharField()
    date_of_birth = serializers.DateField()
    profession = serializers.CharField(required=False, allow_blank=True)

    # class Meta:
    #     model = User
    #     # fields = ("email", "nickname", "password", "nationality", "first_name", "last_name", "phone", "date_of_birth", "profession")
    #     fields = ("email", "nickname", "password", "password2", "nationality", "first_name", "last_name", "phone", "date_of_birth", "profession")

    # def get_cleaned_data(self) -> Any:
    #     # return {
    #     #     "nickname": self.validated_data.get("nickname", ""),
    #     #     "nationality": self.validated_data.get("nationality", ""),
    #     #     "first_name": self.validated_data.get("first_name", ""),
    #     #     "last_name": self.validated_data.get("last_name", ""),
    #     #     "phone": self.validated_data.get("phone", ""),
    #     #     "date_of_birth": self.validated_data.get("date_of_birth", ""),
    #     #     "profession": self.validated_data.get("profession", "")
    #     # }
    #     cleaned_data = super().get_cleaned_data()
    #     cleaned_data["nickname"] = self.validated_data.get("nickname", "")
    #     cleaned_data["nationality"] = self.validated_data.get("nationality", "")
    #     cleaned_data["first_name"] = self.validated_data.get("first_name", "")
    #     cleaned_data["last_name"] = self.validated_data.get("last_name", "")
    #     cleaned_data["phone"] = self.validated_data.get("phone", "")
    #     cleaned_data["date_of_birth"] = self.validated_data.get("date_of_birth")
    #     cleaned_data["profession"] = self.validated_data.get("profession", "")
    #     return cleaned_data

    def save(self, request: Request) -> Any:
        user = super().save(request)
        user.nickname = self.data.get("nickname")
        user.nationality = self.data.get("nationality")
        user.first_name = self.data.get("first_name")
        user.last_name = self.data.get("last_name")
        user.phone = self.data.get("phone")
        user.date_of_birth = self.data.get("date_of_birth")
        user.profession = self.data.get("profession")
        return user


# class SignupSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
#     password = serializers.CharField(required=True, validators=[validate_password])
#     password2 = serializers.CharField(required=True, write_only=True)
#
#     class Meta:
#         model = User
#         # fields = ("email", "nickname", "password", "nationality", "first_name", "last_name", "phone", "date_of_birth", "profession")
#         fields = ("email", "nickname", "password", "password2", "nationality", "first_name", "last_name", "phone", "date_of_birth", "profession")
#
#     def validate(self, data):
#         if data["password"] != data["password2"]:
#             raise serializers.ValidationError({"password": "Passwords didn't match."})
#         return data
#
#     def create(self, validated_data):
#         # return User.objects.create_user(**validated_data)
#         user = User.objects.create_user(email=validated_data["email"], password=validated_data["password"])
#         # user.set_password(validated_data["password"])
#         # Token.objects.create(user=user)
#         return user


# class LoginSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ("email", "password")


class UserSerializer(serializers.ModelSerializer[User]):
    class Meta:
        model = User
        fields = (
            "id",
            "url",
            "email",
            "nickname",
            "nationality",
            "password",
            "first_name",
            "last_name",
            "phone",
            "date_of_birth",
            "profession",
            "profile_image",
        )
        extra_kwargs = {"password": {"write_only": True}}
