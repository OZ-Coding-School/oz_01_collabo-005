from django.shortcuts import render
from rest_framework import viewsets, permissions

from app.album.models import Album
from app.album.permissions import IsUploaderOrReadOnly
from app.album.serializers import AlbumSerializer
from app.board.permissions import IsWriterOrReadOnly


class AlbumView(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsUploaderOrReadOnly]
