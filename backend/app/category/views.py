from typing import Type

from django.shortcuts import render
from rest_framework import permissions, viewsets

from app.category.models import Category
from app.category.serializers import CategorySerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet[Category]):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# class CategoryViewSet(viewsets.ModelViewSet):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly,
#                           IsAdminOrReadOnly]
