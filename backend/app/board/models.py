from django.db import models

from app.common.models import BaseModel

# class Board(BaseModel):
#     club = models.ForeignKey("club.Club", on_delete=models.CASCADE, related_name="board")
#
#     TYPE_CHOICES = ((0, "General"), (1, "Plan"))
#     type = models.IntegerField(choices=TYPE_CHOICES, default=0)


class Post(BaseModel):
    # board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="post")
    club = models.ForeignKey("club.Club", on_delete=models.CASCADE, related_name="post")
    title = models.CharField(max_length=100)
    content = models.TextField()
    view_count = models.IntegerField(default=0)
    writer = models.ForeignKey("user.User", on_delete=models.CASCADE, related_name="post")


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
