from django.contrib import admin
from .models import Post

from app.board.models import Post, Schedule

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title']
