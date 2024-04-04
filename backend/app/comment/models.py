from django.db import models

from app.board.models import Post
from app.common.models import BaseModel


class Comment(BaseModel):
    post = models.ForeignKey("board.Post", on_delete=models.CASCADE, related_name="comments")
    club = models.ForeignKey("club.Club", on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey("user.User", on_delete=models.CASCADE, related_name="comments")
    content = models.TextField()
