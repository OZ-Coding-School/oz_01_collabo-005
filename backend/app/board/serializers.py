from rest_framework import serializers

from app.board.models import Board, Post


class BoardSerializer(serializers.ModelSerializer[Board]):
    class Meta:
        model = Board
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer[Post]):
    class Meta:
        model = Post
        fields = "__all__"
