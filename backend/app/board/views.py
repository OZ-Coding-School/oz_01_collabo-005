from django.utils import timezone
from rest_framework import permissions, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.serializers import BaseSerializer

from app.board.models import Post, Schedule
from app.board.permissions import IsWriterOrReadOnly
from app.board.serializers import PostSerializer, ScheduleSerializer


class PostViewSet(viewsets.ModelViewSet[Post]):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsWriterOrReadOnly]

    def get_queryset(self) -> Post:
        club_id = self.kwargs.get("club_id")
        if club_id is None:
            raise NotFound(detail="club not found")
        return Post.objects.filter(club_id=club_id).order_by("-created_at")

    def perform_create(self, serializer: BaseSerializer[Post]) -> None:
        club_id = self.kwargs.get("club_id")
        serializer.save(club_id=club_id, writer=self.request.user)


class ScheduleViewSet(viewsets.ModelViewSet[Schedule]):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsWriterOrReadOnly]

    def get_queryset(self) -> Schedule:
        club_id = self.kwargs.get("club_id")
        if club_id is None:
            raise NotFound(detail="club not found")
        current_datetime = timezone.now()
        return Schedule.objects.filter(club_id=club_id, event_time__gte=current_datetime).order_by("event_time")

    def perform_create(self, serializer: BaseSerializer[Schedule]) -> None:
        club_id = self.kwargs.get("club_id")
        serializer.save(club_id=club_id, writer=self.request.user)
