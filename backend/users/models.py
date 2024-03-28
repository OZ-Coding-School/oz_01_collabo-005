from __future__ import annotations, unicode_literals

from typing import Any, TypeVar

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

T = TypeVar("T", bound="AbstractUser")


class UserManager(BaseUserManager[T]):
    def create_user(self, email: str, password: str, **extra_fields: dict[str, Any]) -> Any:
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, password: str, **extra_fields: dict[str, Any]) -> User:
        """
        Create and save a superuser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email_address"), max_length=255, unique=True)
    nickname = models.CharField(_("nickname"), max_length=10)
    # password = models.CharField(_("password"), max_length=50)
    nationality = models.CharField(_("nationality"), max_length=50)
    first_name = models.CharField(_("first name"), max_length=10)
    last_name = models.CharField(_("last name"), max_length=10)
    phone = models.CharField(_("phone"), max_length=30)
    birthday = models.DateField(_("birthday"), null=True, blank=True)
    profession = models.CharField(_("profession"), max_length=10)
    is_staff = models.BooleanField(
        _("staff status"), default=False, help_text=_("Designates whether the user can log into this admin site.")
    )
    is_active = models.BooleanField(_("active"), default=True)
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    USERNAME_FIELD = "email"
    objects = UserManager()

    def get_full_name(self) -> str:
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self) -> str:
        """
        Returns the short name for the user.
        """
        return self.first_name

    def email_user(self, subject: str, message: str, from_email: str | None = None, **kwargs: dict[str, Any]) -> None:
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)
