from django.contrib import admin
from django.contrib.admin import ModelAdmin

from .models import InterestClub, JoinedClub


# JoinedClub 모델에 대한 관리자 설정
@admin.register(JoinedClub)
class JoinedClubAdmin(admin.ModelAdmin):
    list_display = ("user", "club", "created_at")
    list_filter = ("user", "club", "created_at")
    search_fields = ("user__username", "club__name")
    readonly_fields = ("created_at", "updated_at")


# InterestClub 모델에 대한 관리자 설정
@admin.register(InterestClub)
class InterestClubAdmin(admin.ModelAdmin):
    list_display = ("user", "club", "created_at")
    list_filter = ("user", "club", "created_at")
    search_fields = ("user__username", "club__name")
    readonly_fields = ("created_at", "updated_at")
