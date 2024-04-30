from rest_framework import serializers

from app.board.models import Post, Schedule


class PostSerializer(serializers.ModelSerializer[Post]):
    writer = serializers.ReadOnlyField(source="writer.nickname")
    writer_image = serializers.ImageField(source="writer.profile_image", read_only=True)

    class Meta:
        model = Post
        fields = ("id", "title", "content", "image", "writer", "writer_image", "created_at", "updated_at")
        read_only_fields = ("writer",)


class ScheduleSerializer(serializers.ModelSerializer[Schedule]):
    class Meta:
        model = Schedule
        fields = ("id", "title", "content", "event_time", "place", "max_attendees", "created_at", "updated_at")
