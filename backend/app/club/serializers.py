from rest_framework import serializers

from app.club.models import Club


class ClubSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Club
        fields = ("url", "name")


# class ClubSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Club
#         fields = "__all__"
