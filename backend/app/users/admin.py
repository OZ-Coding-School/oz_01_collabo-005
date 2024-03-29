from django.contrib import admin

from app.users.models import User

admin.site.register(User)

# @admin.register(User)
# class CustomUserAdmin(UserAdmin):
#     pass
