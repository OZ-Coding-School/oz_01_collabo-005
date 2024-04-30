from __future__ import annotations, unicode_literals

from typing import Any

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from app.common.models import BaseModel
from app.user.utils import user_image_upload_path


class UserManager(BaseUserManager["User"]):
    """
    Create and save a User with the given email and password.
    """

    def create_user(self, email: str, password: str, **extra_fields: dict[str, Any]) -> Any:
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_("Users must have an email address"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, password: str, **extra_fields: Any) -> Any:
        """
        Create and save a superuser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if not extra_fields.get("is_staff"):
            raise ValueError(_("Superuser must have is_staff=True."))
        if not extra_fields.get("is_superuser"):
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    email = models.EmailField(_("email_address"), max_length=255, unique=True, null=False, blank=False)
    nickname = models.CharField(_("nickname"), max_length=10)
    nationality = models.CharField(_("nationality"), max_length=50)
    first_name = models.CharField(_("first name"), max_length=10)
    last_name = models.CharField(_("last name"), max_length=10)
    phone = models.CharField(_("phone"), max_length=30)
    date_of_birth = models.DateField(_("date of birth"), null=True, blank=True)
    profession = models.CharField(_("profession"), max_length=10, null=True, blank=True)
    profile_image = models.ImageField(
        _("profile image"), upload_to=user_image_upload_path, editable=True, null=True, blank=True
    )
    is_staff = models.BooleanField(
        _("staff status"), default=False, help_text=_("whether the user can log into this admin site.")
    )
    is_active = models.BooleanField(_("active"), default=True)
    is_superuser = models.BooleanField(default=True)
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    USERNAME_FIELD = "email"
    objects = UserManager()

    def __str__(self) -> str:
        return self.email

    def get_full_name(self) -> str:
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()


class Nationality(BaseModel):
    nationality = models.CharField(_("nationality"), max_length=30)
    continent = models.CharField(_("continent"), max_length=15)
    flag_icon = models.ImageField(_("flag icon"), upload_to="images/nationality/", editable=True)

    class Meta:
        verbose_name = "Nationality"
        verbose_name_plural = "Nationalities"

    def __str__(self) -> str:
        return self.nationality


class AgeGroup(BaseModel):
    group = models.CharField(max_length=10, unique=True)
    max_age = models.IntegerField()
    min_age = models.IntegerField()

    def __str__(self) -> str:
        return self.group
