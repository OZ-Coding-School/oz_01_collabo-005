from django.db.models import Model
from rest_framework import serializers
from rest_framework.relations import SlugRelatedField

from app.club.models import Club


# class ClubSerializer(serializers.HyperlinkedModelSerializer):
class ClubSerializer(serializers.ModelSerializer[Club]):
    leader: SlugRelatedField[Model | Model] = serializers.SlugRelatedField(read_only=True, slug_field="nickname")

    class Meta:
        model = Club
        fields = (
            "id",
            "url",
            "name",
            "description",
            "category",
            "image",
            "leader",
            "max_members",
            "frequent_place",
            "age_group",
        )


# class ClubSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Club
#         fields = "__all__"
