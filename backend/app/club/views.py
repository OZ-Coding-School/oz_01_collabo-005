from rest_framework import generics, permissions, viewsets
from rest_framework.serializers import BaseSerializer

from app.activity.models import JoinedClub
from app.club.models import Club
from app.club.permissions import IsLeaderOrReadOnly
from app.club.serializers import ClubMemberSerializer, ClubSerializer


class ClubViewSet(viewsets.ModelViewSet[Club]):
    # queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsLeaderOrReadOnly]

    def get_queryset(self):
        return Club.objects.all().order_by("-created_at")

    def perform_create(self, serializer: BaseSerializer[Club]) -> None:
        club = serializer.save(leader=self.request.user)
        JoinedClub.objects.create(user=club.leader, club=club)


class ClubMemberView(generics.ListAPIView[JoinedClub]):
    serializer_class = ClubMemberSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> JoinedClub:
        club_id = self.kwargs.get("pk")
        return JoinedClub.objects.filter(club_id=club_id).order_by("-created_at")
