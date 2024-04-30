from rest_framework import routers

from app.board import views

router = routers.DefaultRouter()
router.register(r"posts", views.PostViewSet, basename="post")
router.register(r"schedules", views.ScheduleViewSet, basename="schedule")
urlpatterns = router.urls
