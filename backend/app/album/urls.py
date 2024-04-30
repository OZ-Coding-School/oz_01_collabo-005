from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from app.album import views

router = DefaultRouter()
router.register(r"", views.AlbumView, basename="album")
urlpatterns = [path("", include(router.urls))]
