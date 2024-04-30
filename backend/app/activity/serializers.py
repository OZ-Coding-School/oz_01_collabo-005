from rest_framework import serializers

from app.activity.models import JoinedClub
from app.board.models import Post
from app.club.serializers import ClubSerializer
from app.comment.models import Comment


class JoinedClubListSerializer(serializers.ModelSerializer[JoinedClub]):
    club = ClubSerializer(read_only=True)

    class Meta:
        model = JoinedClub
        fields = ("id", "club")


class JoinClubSerializer(serializers.ModelSerializer[JoinedClub]):
    user = serializers.ReadOnlyField(source="user.id")

    class Meta:
        model = JoinedClub
        fields = ("id", "user", "club")
        read_only_fields = ("user", "club")


class MyPostSerializer(serializers.ModelSerializer):
    club = serializers.ReadOnlyField(source="club.name")
    writer = serializers.ReadOnlyField(source="writer.nickname")

    class Meta:
        model = Post
        fields = ("id", "club", "title", "content", "image", "writer", "created_at", "updated_at")
        read_only_fields = ("writer",)


class MyCommentSerializer(serializers.ModelSerializer[Comment]):
    club = serializers.ReadOnlyField(source="club.name")
    post = serializers.ReadOnlyField(source="post.title")
    user = serializers.ReadOnlyField(source="user.nickname")

    class Meta:
        model = Comment
        fields = ("id", "club", "post", "user", "content", "created_at", "updated_at")
        read_only_fields = ("club", "post", "user")


class FeedSerializer(serializers.ModelSerializer):
    club = serializers.ReadOnlyField(source="club.name")
    writer = serializers.ReadOnlyField(source="writer.nickname")

    class Meta:
        model = Post
        fields = ("id", "club", "title", "content", "writer", "image", "created_at", "updated_at")
