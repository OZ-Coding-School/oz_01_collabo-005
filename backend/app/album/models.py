from django.db import models

from app.common.models import BaseModel

# class Album(BaseModel):
#     club = models.ForeignKey("club.Club", on_delete=models.CASCADE, related_name="album")


# class Photo(BaseModel):
class Album(BaseModel):
    club = models.ForeignKey("club.Club", on_delete=models.CASCADE, related_name="album")
    title = models.CharField(max_length=30)
    photo = models.ImageField(upload_to="images/album/")
    uploader = models.ForeignKey("user.User", on_delete=models.CASCADE, related_name="album")
