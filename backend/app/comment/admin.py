from django.contrib import admin
from .models import Comment

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    readonly_fields = ['created_at', 'updated_at']
    list_display = ['id', 'post', 'club', 'user', 'content', 'created_at', 'updated_at']
    ordering = ['-created_at']  # 작성 시간순으로 역순으로 정렬

    # 사용자 정의 작업: 선택한 Comment를 삭제하는 작업
    def delete_selected_comments(self, request, queryset):
        queryset.delete()
    delete_selected_comments.short_description = "Delete selected comments"

    # 관리자 패널에 사용자 정의 작업을 등록
    actions = [delete_selected_comments]
