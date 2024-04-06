from django.db import models

from app.common.models import BaseModel


class Club(BaseModel):
    name = models.CharField(max_length=10, unique=True)
    description = models.TextField()
    category = models.ForeignKey("category.Category", on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to="images/club/", blank=True, null=True)
    leader = models.ForeignKey("user.User", on_delete=models.SET_NULL, null=True)
    max_members = models.IntegerField(default=100)
    place = models.CharField(max_length=10, null=True, blank=True, help_text="frequent gathering place")
