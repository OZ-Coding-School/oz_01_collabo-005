from django.contrib import admin
from .models import BaseModel

# BaseModel에 대한 관리자 설정 클래스 정의
@admin.register(BaseModel)
class BaseModelAdmin(admin.ModelAdmin):
    # 수정할 수 없는 필드 설정
    readonly_fields = ['updated_at', 'created_at']
    # 관리자 패널에서 표시할 필드 지정
    list_display = ('id', 'updated_at', 'created_at')
    # 기본 정렬 순서 설정
    ordering = ['-created_at']
