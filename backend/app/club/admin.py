from typing import Any

import django_stubs_ext
from django.contrib import admin

from app.club.models import Club

django_stubs_ext.monkeypatch()


@admin.register(Club)
class ClubAdmin(admin.ModelAdmin[Club]):
    list_display = ("name", "get_category_name", "leader", "max_members")

    def get_category_name(self, obj: Club) -> Any:
        return obj.category.name if obj.category else "No Category"
