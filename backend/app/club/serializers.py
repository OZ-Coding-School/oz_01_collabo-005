from rest_framework import serializers

from app.club.models import Club


class ClubSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Club
        fields = ("id", "url", "name", "description", "category", "image", "leader", "max_members", "place")


# class ClubSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Club
#         fields = "__all__"
