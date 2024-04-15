from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from app.user.models import User

# admin.site.register(User)


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ("id", "email", "nickname", "is_staff", "is_active", "is_superuser")
    list_filter = ("is_staff", "is_active", "is_superuser", "nationality")
    search_fields = ("email", "nickname")
    ordering = ("email", "nickname", "is_staff", "is_active")
    readonly_fields = ("date_joined",)
    fieldsets = (
        (None, {"fields": ("email", "nickname", "is_staff", "is_active", "date_joined")}),
        (
            "Personal Info",
            {"fields": ("first_name", "last_name", "phone", "nationality", "date_of_birth", "profession")},
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "nickname",
                    "first_name",
                    "last_name",
                    "phone",
                    "nationality",
                    "date_of_birth",
                    "profession",
                ),
            },
        ),
    )
