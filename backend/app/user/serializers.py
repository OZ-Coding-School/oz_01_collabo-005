from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers

from app.user.models import User


class SignupSerializer(RegisterSerializer):  # type: ignore
    nickname = serializers.CharField()
    nationality = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phone = serializers.CharField()
    date_of_birth = serializers.DateField()
    profession = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = (
            "email",
            "nickname",
            "password1",
            "password2",
            "nationality",
            "first_name",
            "last_name",
            "phone",
            "date_of_birth",
            "profession",
        )


class CustomUserDetail(UserDetailsSerializer):
    nickname = serializers.CharField()
    nationality = serializers.CharField()
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    phone = serializers.CharField()
    date_of_birth = serializers.DateField()
    profession = serializers.CharField(required=False, allow_blank=True)
    profile_image = serializers.ImageField(required=False)
    date_joined = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = UserDetailsSerializer.Meta.fields + (
            "nickname",
            "nationality",
            "password1",
            "password2",
            "phone",
            "date_of_birth",
            "profession",
            "profile_image",
            "date_joined",
        )
        read_only_fields = ("date_joined",)

    def update(self, instance, validated_data):
        if "password1" in validated_data and "password2" in validated_data:
            password1 = validated_data.pop("password1")
            password2 = validated_data.pop("password2")
            if password1 and password2 and password1 == password2:
                instance.set_password(password1)
            else:
                raise serializers.ValidationError("Passwords don't match")
        return super().update(instance, validated_data)


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
