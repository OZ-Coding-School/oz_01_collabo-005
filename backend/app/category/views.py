from rest_framework import permissions, viewsets

from app.category.models import Category
from app.category.serializers import CategorySerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet[Category]):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
