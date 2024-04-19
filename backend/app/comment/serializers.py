from rest_framework import serializers

from app.comment.models import Comment


class CommentSerializer(serializers.ModelSerializer[Comment]):
    user = serializers.ReadOnlyField(source='user.nickname')

    class Meta:
        model = Comment
        fields = ("id", "content", "user", "created_at", "updated_at")
        read_only_fields = ("user",)
