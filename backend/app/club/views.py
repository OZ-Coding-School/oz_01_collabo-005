from django.shortcuts import render
from django.views.generic import ListView
from rest_framework import viewsets, permissions

from app.club.models import Club
from app.club.permissions import IsOwnerOrReadOnly
from app.club.serializers import ClubSerializer


# class ClubListView(ListView):
#     pass

class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(leader=self.request.user)
