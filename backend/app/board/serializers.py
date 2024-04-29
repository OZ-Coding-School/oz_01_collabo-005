from rest_framework import serializers

from app.board.models import Post, Schedule


# class BoardSerializer(serializers.ModelSerializer[Board]):
#     class Meta:
#         model = Board
#         fields = "__all__"


# class PostImageSerializer(serializers.ModelSerializer):
#     image = serializers.ImageField(use_url=True)
#
#     class Meta:
#         model = PostImage
#         fields = ("image")


class PostSerializer(serializers.ModelSerializer[Post]):
    # writer = serializers.SerializerMethodField("get_writer")
    writer = serializers.ReadOnlyField(source="writer.nickname")
    writer_image = serializers.ImageField(source="writer.profile_image", read_only=True)
    # images = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # images = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ("id", "title", "content", "image", "writer", "writer_image", "created_at", "updated_at")
        read_only_fields = ("writer",)

    # def get_writer(self, model):
    #     return model.writer.nickname

    # def get_images(self, obj):
    #     image = obj.image.all()
    #     return PostImageSerializer(instance=image, many=True).data
    #
    # def create(self, validated_data):
    #     instance = Post.objects.create(**validated_data)
    #     image_set = self.context["request"].FILES
    #     for image in image_set.getlist("image"):
    #         PostImage.objects.create(post=instance, image=image)
    #     return instance

    # def create(self, validated_data):
    #     # validated_data["club"] = self.context["club_id"]
    #     # validated_data["writer"] = self.context["request"].user
    #     # return super().create(validated_data)
    #     club_id = self.context.get("club_id")
    #     writer = self.context.get("request").user
    #     post = Post.objects.create(club_id=club_id, writer=writer, **validated_data)
    #     return post


class ScheduleSerializer(serializers.ModelSerializer[Schedule]):
    # url = serializers.HyperlinkedIdentityField(view_name="schedule-detail")

    class Meta:
        model = Schedule
        fields = ("id", "title", "content", "event_time", "place", "max_attendees", "created_at", "updated_at")
