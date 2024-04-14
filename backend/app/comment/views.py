from django.shortcuts import render
from rest_framework import viewsets, permissions

from app.comment.models import Comment
from app.comment.permissions import IsUserOrReadOnly
from app.comment.serializers import CommentSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsUserOrReadOnly]
