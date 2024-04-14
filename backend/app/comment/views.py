from django.db.models import QuerySet
from django.shortcuts import render
from rest_framework import permissions, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.serializers import BaseSerializer

from app.comment.models import Comment
from app.comment.permissions import IsUserOrReadOnly
from app.comment.serializers import CommentSerializer


class CommentViewSet(viewsets.ModelViewSet[Comment]):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsUserOrReadOnly]

    def get_queryset(self) -> QuerySet[Comment]:
        club_id = self.kwargs.get("club_id")
        if club_id is None:
            raise NotFound(detail="club not found")
        post_id = self.kwargs.get("post_id")
        if post_id is None:
            raise NotFound(detail="post not found")
        return Comment.objects.filter(club_id=club_id, post_id=post_id)

    def perform_create(self, serializer: BaseSerializer[Comment]) -> None:
        post_id = self.kwargs.get("post_id")
        club_id = self.kwargs.get("club_id")
        serializer.save(post_id=post_id, club_id=club_id, user=self.request.user)
