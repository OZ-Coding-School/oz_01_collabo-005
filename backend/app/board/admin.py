from django.contrib import admin

from .models import Post, Schedule


# Post 모델에 대한 관리자 설정
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "club", "writer", "view_count", "created_at", "updated_at")
    list_filter = ("club", "writer", "created_at")
    search_fields = ("title", "content")
    readonly_fields = ("created_at", "updated_at")


# Schedule 모델에 대한 관리자 설정
@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ("title", "club", "writer", "event_time", "place", "max_attendees", "created_at", "updated_at")
    list_filter = ("club", "writer", "event_time")
    search_fields = ("title", "content", "place")
    readonly_fields = ("created_at", "updated_at")
