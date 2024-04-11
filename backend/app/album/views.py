from django.shortcuts import render
from rest_framework import viewsets

from app.album.models import Album


class AlbumView(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class =