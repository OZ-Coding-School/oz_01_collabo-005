from django.shortcuts import render
from rest_framework import permissions, viewsets

from app.board.models import Board, Post
from app.board.permissions import IsWriterOrReadOnly
from app.board.serializers import BoardSerializer, PostSerializer


class BoardViewSet(viewsets.ModelViewSet[Board]):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsWriterOrReadOnly]


class PostViewSet(viewsets.ModelViewSet[Post]):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsWriterOrReadOnly]
