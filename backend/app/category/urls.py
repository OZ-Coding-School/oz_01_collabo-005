from django.urls import path, include
from rest_framework.routers import DefaultRouter

from app.category.views import CategoryViewSet

router = DefaultRouter()
router.register(r"", CategoryViewSet, basename="category")
urlpatterns = router.urls
# urlpatterns = [
#     path('', include(router.urls))
# ]
