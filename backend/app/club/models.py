from django.db import models

from app.club.utils import club_image_upload_path
from app.common.models import BaseModel
from app.user.models import AgeGroup, User


class Club(BaseModel):
    name = models.CharField(max_length=10, unique=True)
    description = models.TextField()
    category = models.ForeignKey("category.Category", on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to=club_image_upload_path, blank=True, null=True)
    leader = models.ForeignKey("user.User", on_delete=models.SET_NULL, null=True)
    max_members = models.IntegerField(default=100)
    frequent_place = models.CharField(max_length=10, null=True, blank=True, help_text="frequent gathering place")
    age_group = models.ManyToManyField(AgeGroup, blank=True)
