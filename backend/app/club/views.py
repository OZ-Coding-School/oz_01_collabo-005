from rest_framework import permissions, viewsets
from rest_framework.serializers import BaseSerializer

from app.club.models import Club
from app.club.permissions import IsOwnerOrReadOnly
from app.club.serializers import ClubSerializer

# _MT = TypeVar("_MT", bound=Model)


class ClubViewSet(viewsets.ModelViewSet[Club]):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer: BaseSerializer[Club]) -> None:
        serializer.save(leader=self.request.user)
