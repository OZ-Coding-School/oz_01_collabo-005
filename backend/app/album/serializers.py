from rest_framework import serializers

from app.board.models import Post


class AlbumSerializer(serializers.ModelSerializer):
    # url =
    class Meta:
        model = Post
        fields = ("id", "image", "title", "writer", "created_at", "updated_at")
