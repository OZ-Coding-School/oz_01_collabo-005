from rest_framework.routers import DefaultRouter

from app.club.views import ClubViewSet

router = DefaultRouter()
router.register(r"", ClubViewSet, basename="club")
urlpatterns = router.urls
