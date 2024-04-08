from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.settings import api_settings

from app.user.models import User

# User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(required=True, validators=[validate_password])
    password2 = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        # fields = ("email", "nickname", "password", "nationality", "first_name", "last_name", "phone", "date_of_birth", "profession")
        fields = ("email", "nickname", "password", "password2", "nationality", "first_name", "last_name", "phone", "date_of_birth", "profession")

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError({"password": "Passwords didn't match."})
        return data

    def create(self, validated_data):
        # return User.objects.create_user(**validated_data)
        user = User.objects.create_user(email=validated_data["email"], password=validated_data["password"])
        # user.set_password(validated_data["password"])
        # Token.objects.create(user=user)
        return user


# class LoginSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ("email", "password")


class UserSerializer(serializers.ModelSerializer[User]):
    class Meta:
        model = User
        fields = (
            "id",
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
