from django.db.models import QuerySet
from django.shortcuts import render
from rest_framework import generics, permissions, viewsets

from app.activity.models import JoinedClub
from app.activity.serializers import JoinedClubSerializer


class JoinedClubListCreate(generics.ListCreateAPIView[JoinedClub]):
    queryset = JoinedClub.objects.all()
    serializer_class = JoinedClubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self) -> QuerySet[JoinedClub]:
        user = self.request.user
        return self.queryset.filter(user=user)

    # def perform_create(self, serializer):
    #     serializer.save()
