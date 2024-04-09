from rest_framework import routers

from app.board import views

router = routers.DefaultRouter()
router.register(r"", views.BoardViewSet, basename="board")
router.register(r"post/<int:pk>", views.PostViewSet, basename="post")
urlpatterns = router.urls
