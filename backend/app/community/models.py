from django.db import models

from app.common.models import BaseModel


class Category(BaseModel):
    name = models.CharField(max_length=10, unique=True)
    picture = models.ImageField(upload_to='')


class Community(BaseModel):
    name = models.CharField(max_length=10, unique=True)
    description = models.TextField()
    category = models.ForeignKey("Category", on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to='', blank=True, null=True)
    leader = models.ForeignKey("user.User", on_delete=models.SET_NULL, null=True)
    max_members = models.IntegerField(default=100)
    place = models.CharField(max_length=10, null=True, blank=True, help_text="frequent gathering place")
