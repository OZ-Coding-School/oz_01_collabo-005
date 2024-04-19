from rest_framework import permissions, viewsets, generics
from rest_framework.serializers import BaseSerializer

from app.activity.models import JoinedClub
from app.club.models import Club
from app.club.permissions import IsLeaderOrReadOnly
from app.club.serializers import ClubSerializer, ClubMemberSerializer


# _MT = TypeVar("_MT", bound=Model)


class ClubViewSet(viewsets.ModelViewSet[Club]):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsLeaderOrReadOnly]

    def perform_create(self, serializer: BaseSerializer[Club]) -> None:
        serializer.save(leader=self.request.user)


class ClubMemberView(generics.ListAPIView):
    # queryset = JoinedClub.objects.all()
    serializer_class = ClubMemberSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        club_id = self.kwargs.get("pk")
        return JoinedClub.objects.filter(club_id=club_id)
