from django.db import models

from app.common.models import BaseModel


class Category(BaseModel):
    name = models.CharField(max_length=10, unique=True)
    picture = models.ImageField(upload_to='images/category/')

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
