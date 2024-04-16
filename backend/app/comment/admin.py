from django.contrib import admin
from .models import Comment

# Comment에 대한 관리자 설정 클래스 정의
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    # 수정할 수 없는 필드 설정
    readonly_fields = ['created_at', 'updated_at']
    # 관리자 패널에서 표시할 필드 지정
    list_display = ['id', 'post', 'club', 'user', 'content', 'created_at', 'updated_at']
    # 기본 정렬 순서 설정
    ordering = ['-created_at']

    # 인라인 관리자 추가: Comment와 연결된 모델의 인라인 표시
    class CommentInline(admin.TabularInline):
        model = Comment
        extra = 0

    # Comment 모델에 연결된 다른 모델이 있다면, 인라인 관리자를 추가
    # 이 예제에서는 Comment 모델이 자기 참조하는 경우를 가정
    inlines = [CommentInline]

    # 사용자 정의 작업 추가: 선택한 Comment를 삭제하는 작업
    def delete_selected_comments(self, request, queryset):
        queryset.delete()
    delete_selected_comments.short_description = "Delete selected comments"

    # 사용자 정의 작업을 관리자 패널에 추가합니다.
    actions = [delete_selected_comments]

