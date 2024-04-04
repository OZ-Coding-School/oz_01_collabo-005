from django.db import models

from app.common.models import BaseModel


class Album(BaseModel):
    club = models.ForeignKey('club.Club', on_delete=models.CASCADE, related_name='album')


class Photo(BaseModel):
    title = models.CharField(max_length=30)
    photo = models.ImageField(upload_to='album/')
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='photo')
