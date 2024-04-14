from rest_framework import serializers

from app.comment.models import Comment


class CommentSerializer(serializers.ModelSerializer[Comment]):
    class Meta:
        model = Comment
        fields = ("id", "content")
