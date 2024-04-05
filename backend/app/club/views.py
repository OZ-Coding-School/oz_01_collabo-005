from typing import TypeVar

from django.db.models import Model
from django.shortcuts import render
from django.views.generic import ListView
from rest_framework import permissions, viewsets
from rest_framework.serializers import BaseSerializer

from app.club.models import Club
from app.club.permissions import IsOwnerOrReadOnly
from app.club.serializers import ClubSerializer

_MT = TypeVar("_MT", bound=Model)


class ClubViewSet(viewsets.ModelViewSet[Club]):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer: BaseSerializer[_MT]) -> None:
        serializer.save(leader=self.request.user)
