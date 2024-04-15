from rest_framework import serializers

from app.activity.models import JoinedClub


class JoinedClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = JoinedClub
        fields = ("id", "user", "club")
        read_only_fields = ("id", "user")

    # def validate(self, attrs):
    #     if JoinedClub.objects.filter(user=attrs["user"], club=attrs["club"]).exists():
    #         raise serializers.ValidationError("You are already joined this club")
    #     return attrs
