from django.contrib import admin

from .models import Album


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ("title", "club", "uploader", "created_at", "updated_at")
    list_filter = ("club", "uploader", "created_at")
    search_fields = ("title",)
    readonly_fields = ("created_at", "updated_at")
