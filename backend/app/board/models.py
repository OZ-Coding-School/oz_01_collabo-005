from django.db import models

from app.board.utils import post_image_upload_path
from app.common.models import BaseModel


class Post(BaseModel):
    club = models.ForeignKey("club.Club", on_delete=models.CASCADE, related_name="post")
    title = models.CharField(max_length=100)
    content = models.TextField()
    view_count = models.IntegerField(default=0)
    writer = models.ForeignKey("user.User", on_delete=models.CASCADE, related_name="post")
    image = models.ImageField(upload_to=post_image_upload_path, blank=True, null=True)


class Schedule(BaseModel):
    club = models.ForeignKey("club.Club", on_delete=models.CASCADE, related_name="schedule")
    title = models.CharField(max_length=100)
    content = models.TextField()
    view_count = models.IntegerField(default=0)
    writer = models.ForeignKey("user.User", on_delete=models.CASCADE, related_name="schedule")
    event_time = models.DateTimeField()
    place = models.CharField(max_length=100)
    max_attendees = models.IntegerField(null=True, blank=True)

    def __str__(self) -> str:
        return self.title
