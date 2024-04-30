from django.urls import path
from rest_framework.routers import DefaultRouter

from app.club.views import ClubMemberView, ClubViewSet

router = DefaultRouter()
router.register(r"", ClubViewSet, basename="club")
urlpatterns = router.urls + [path(r"<int:pk>/members/", ClubMemberView.as_view(), name="")]
