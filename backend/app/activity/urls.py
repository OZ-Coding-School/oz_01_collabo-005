from django.urls import path
from rest_framework.routers import DefaultRouter

from app.activity.views import JoinedClubListCreate

router = DefaultRouter()
router.register(r"join", JoinedClubListCreate, basename="activity")
urlpatterns = router.urls
