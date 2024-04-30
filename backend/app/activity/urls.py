from django.urls import path

from app.activity.views import FeedList, JoinClub, JoinedClubList, LeaveClub, MyPostList

urlpatterns = [
    path("activities/clubs/", JoinedClubList.as_view(), name="joined-club-list"),
    path("clubs/<int:pk>/join/", JoinClub.as_view(), name="join-club"),
    path("clubs/<int:pk>/leave/", LeaveClub.as_view(), name="leave-club"),
    path("activities/posts/", MyPostList.as_view(), name="my-posts"),
    path("activities/comments/", MyPostList.as_view(), name="my-comments"),
    path("activities/feeds/", FeedList.as_view(), name="feeds"),
]
