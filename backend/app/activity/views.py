from django.shortcuts import render
from rest_framework import viewsets, permissions, generics

from app.activity.models import JoinedClub
from app.activity.serializers import JoinedClubSerializer


class JoinedClubListCreate(generics.ListCreateAPIView):
    queryset = JoinedClub.objects.all()
    serializer_class = JoinedClubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)

    # def perform_create(self, serializer):
    #     serializer.save()
