from django.db import models

from app.common.models import BaseModel


class JoinedClub(BaseModel):
    user = models.ForeignKey("user.User", on_delete=models.CASCADE)
    club = models.ForeignKey("club.Club", on_delete=models.CASCADE)


class InterestClub(BaseModel):
    user = models.ForeignKey("user.User", on_delete=models.CASCADE)
    club = models.ForeignKey("club.Club", on_delete=models.CASCADE)
