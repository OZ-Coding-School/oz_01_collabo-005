from rest_framework.routers import DefaultRouter

from app.activity.views import ActivityViewSet

router = DefaultRouter()
router.register(r"posts", ActivityViewSet, basename="activity")
urlpatterns = router.urls
