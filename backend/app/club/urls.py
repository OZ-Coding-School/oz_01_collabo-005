from django.urls import path
from rest_framework.routers import DefaultRouter

from app.club.views import ClubMemberView, ClubViewSet

router = DefaultRouter()
router.register(r"", ClubViewSet, basename="club")
# router.register(r"", ClubMemberView, basename="club-members")
urlpatterns = router.urls + [path(r"<int:pk>/members", ClubMemberView.as_view(), name="")]
