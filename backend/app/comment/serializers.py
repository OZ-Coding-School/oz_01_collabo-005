from rest_framework import serializers

from app.comment.models import Comment


class CommentSerializer(serializers.ModelSerializer[Comment]):
    user = serializers.ReadOnlyField(source="user.nickname")
    user_image = serializers.ImageField(source="user.profile_image", read_only=True)

    class Meta:
        model = Comment
        fields = ("id", "content", "user", "user_image", "created_at", "updated_at")
        read_only_fields = ("user", "user_image")
