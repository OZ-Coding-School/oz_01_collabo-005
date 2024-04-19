from rest_framework import serializers

from app.activity.models import JoinedClub
from app.club.serializers import ClubSerializer


class JoinedClubListSerializer(serializers.ModelSerializer[JoinedClub]):
    # club = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
    # club = serializers.HyperlinkedRelatedField(view_name='club-detail', read_only=True)
    club = ClubSerializer(read_only=True)

    class Meta:
        model = JoinedClub
        fields = ("id", "club")

    # def validate(self, attrs):
    #     if JoinedClub.objects.filter(user=attrs["user"], club=attrs["club"]).exists():
    #         raise serializers.ValidationError("You are already joined this club")
    #     return attrs


class JoinClubSerializer(serializers.ModelSerializer[JoinedClub]):
    user = serializers.ReadOnlyField(source="user.id")

    class Meta:
        model = JoinedClub
        fields = ("id", "user", "club")
        read_only_fields = ("user", "club")
