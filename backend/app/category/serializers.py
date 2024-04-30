from rest_framework import serializers

from app.category.models import Category
from app.club.serializers import ClubSerializer


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    club_set = ClubSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ("id", "url", "name", "picture", "club_set")
