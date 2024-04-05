from django.shortcuts import render
from django.views.generic import ListView
from rest_framework import viewsets

from app.club.models import Club
from app.club.serializers import ClubSerializer


# class ClubListView(ListView):
#     pass

class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
