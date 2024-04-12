from django.shortcuts import render
from rest_framework import permissions, viewsets

from app.board.models import Post, Schedule
from app.board.permissions import IsWriterOrReadOnly
from app.board.serializers import PostSerializer, ScheduleSerializer


class PostViewSet(viewsets.ModelViewSet[Post]):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsWriterOrReadOnly]


class ScheduleViewSet(viewsets.ModelViewSet[Schedule]):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsWriterOrReadOnly]
