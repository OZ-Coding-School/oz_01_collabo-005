from django.contrib import admin

from app.club.models import Club

# admin.site.register(Club)


@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):
    list_display = ("name", "get_category_name", "leader", "max_members")

    def get_category_name(self, obj):
        return obj.category.name


# class CategoryInline(admin.TabularInline):
#     model = Category
#     fields = ['name']
