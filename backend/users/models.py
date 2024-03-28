from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, AbstractUser
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self):
        pass

    def create_superuser(self):
        pass


class User(AbstractBaseUser, PermissionsMixin, AbstractUser):
    nickname = models.CharField(max_length=10)
    password = models.CharField(max_length=50)
    nationality = models.CharField(max_length=50)
    name = models.CharField(max_length=10)
    phone = models.CharField(max_length=30)
    email = models.EmailField()
    birthday = models.DateField()
    profession = models.CharField(max_length=10)

    USERNAME_FIELD = 'nickname'
    objects = UserManager()
