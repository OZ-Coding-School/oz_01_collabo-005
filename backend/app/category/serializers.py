from rest_framework import serializers

from app.category.models import Category
from app.club.models import Club
from app.club.serializers import ClubSerializer


# class CategorySerializer(serializers.ModelSerializer):
#     club_set = ClubSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = Category
#         fields = ["url", "name", "picture", "club_set"]


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    # clubs = serializers.HyperlinkedIdentityField(many=True, view_name='club-detail', read_only=True, source="club_set")
    club_set = ClubSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "url", "name", "picture", "club_set"]
        # fields = ["url", "name", "picture", "clubs", "club_set"]


# class CategorySerializer(serializers.ModelSerializer):
# clubs = serializers.PrimaryKeyRelatedField(many=True, queryset=Club.objects.all())
# club_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True)


