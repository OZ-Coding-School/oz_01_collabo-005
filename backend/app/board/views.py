from django.shortcuts import render
from rest_framework import permissions, viewsets
from rest_framework.exceptions import NotFound

from app.board.models import Post, Schedule
from app.board.permissions import IsWriterOrReadOnly
from app.board.serializers import PostSerializer, ScheduleSerializer
from app.club.models import Club


class PostViewSet(viewsets.ModelViewSet[Post]):
    # queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsWriterOrReadOnly]

    def get_queryset(self):
        club_id = self.kwargs.get("club_id")
        return Post.objects.filter(club_id=club_id)

    # def get_object(self):
    #     club_id = self.kwargs.get("club_id")
    #     try:
    #         club = Club.objects.get(id=club_id)
    #         print("cl", club)
    #         return club
    #     except Club.DoesNotExist:
    #         raise NotFound("Club not found")

    def perform_create(self, serializer):
        club_id = self.kwargs.get("club_id")
        serializer.save(club_id=club_id, writer=self.request.user)


class ScheduleViewSet(viewsets.ModelViewSet[Schedule]):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsWriterOrReadOnly]

    def get_queryset(self):
        club_id = self.kwargs.get("club_id")
        return Schedule.objects.filter(club_id=club_id)

    def perform_create(self, serializer):
        club_id = self.kwargs.get("club_id")
        serializer.save(club_id=club_id, writer=self.request.user)
