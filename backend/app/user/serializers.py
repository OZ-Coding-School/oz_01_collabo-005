from django.contrib.auth import get_user_model
from rest_framework import serializers

from app.user.models import User

# User = get_user_model()
#
#
# class UserRegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = "__all__"
#         extra_kwargs = {"password": {"write_only": True}}
#
#     def create(self, validated_data):
#         return User.objects.create_user(**validated_data)
#
#
# class UserLoginSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = "__all__"


class UserSerializer(serializers.ModelSerializer[User]):
    class Meta:
        model = User
        fields = ["id", "email", "nickname", "nationality", "password", "first_name", "last_name", "phone", "date_of_birth", "profession", "profile_image"]
