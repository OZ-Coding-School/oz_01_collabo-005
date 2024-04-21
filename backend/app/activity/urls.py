from django.urls import path
from rest_framework.routers import DefaultRouter

from app.activity.views import JoinClub, JoinedClubList, LeaveClub

# router = DefaultRouter()
# router.register(r"joined-club", JoinedClubViewSet, basename="joined-club")
# urlpatterns = router.urls

urlpatterns = [
    path("users/clubs", JoinedClubList.as_view(), name="joined-club-list"),
    path("clubs/<int:pk>/join", JoinClub.as_view(), name="join-club"),
    path("clubs/<int:pk>/leave", LeaveClub.as_view(), name="leave-club"),
]
