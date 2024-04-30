from django.db.models import Q
from rest_framework import permissions, viewsets
from rest_framework.exceptions import NotFound

from app.album.serializers import AlbumSerializer
from app.board.models import Post


# class AlbumView(generics.ListAPIView):
class AlbumView(viewsets.ReadOnlyModelViewSet):
    serializer_class = AlbumSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        club_id = self.kwargs.get("club_id")
        if club_id is None:
            raise NotFound(detail="club not found")
        return (
            Post.objects.filter(club_id=club_id).filter(Q(image__isnull=False) & ~Q(image="")).order_by("-created_at")
        )
