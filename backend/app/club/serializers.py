from rest_framework import serializers

from app.club.models import Club


class ClubSerializer(serializers.HyperlinkedModelSerializer):
    leader = serializers.SlugRelatedField(read_only=True, slug_field="nickname")

    class Meta:
        model = Club
        fields = ("id", "url", "name", "description", "category", "image", "leader", "max_members", "place")


# class ClubSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Club
#         fields = "__all__"
