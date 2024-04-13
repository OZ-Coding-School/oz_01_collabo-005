from rest_framework import serializers

from app.board.models import Post, Schedule

# class BoardSerializer(serializers.ModelSerializer[Board]):
#     class Meta:
#         model = Board
#         fields = "__all__"


class PostSerializer(serializers.ModelSerializer[Post]):
    class Meta:
        model = Post
        fields = ("title", "content")

    # def create(self, validated_data):
    #     # validated_data["club"] = self.context["club_id"]
    #     # validated_data["writer"] = self.context["request"].user
    #     # return super().create(validated_data)
    #     club_id = self.context.get("club_id")
    #     writer = self.context.get("request").user
    #     post = Post.objects.create(club_id=club_id, writer=writer, **validated_data)
    #     return post


class ScheduleSerializer(serializers.ModelSerializer[Schedule]):
    class Meta:
        model = Schedule
        fields = ("title", "content", "event_time", "place", "max_attendees")
