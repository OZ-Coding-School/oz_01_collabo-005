from django.shortcuts import render
from rest_framework import viewsets, permissions

from app.board.models import Board, Post
from app.board.permissions import IsWriterOrReadOnly
from app.board.serializers import BoardSerializer, PostSerializer


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsWriterOrReadOnly]


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsWriterOrReadOnly]
