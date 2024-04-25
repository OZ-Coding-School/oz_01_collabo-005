import datetime
from typing import Any

from django.db.models.query import QuerySet
from django.http import Http404
from django.shortcuts import render
from rest_framework import generics, permissions, status, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer

from app.activity.models import JoinedClub
from app.activity.permissions import IsUserOrReadOnly
from app.activity.serializers import JoinClubSerializer, JoinedClubListSerializer, MyPostSerializer, \
    MyCommentSerializer, FeedSerializer
from app.activity.utils import check_age_condition, is_user_already_joined
from app.board.models import Post
from app.board.serializers import PostSerializer
from app.club.models import Club
from app.comment.models import Comment
from app.user.models import User


class JoinedClubList(generics.ListAPIView[JoinedClub]):
    serializer_class = JoinedClubListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> QuerySet[JoinedClub | JoinedClub]:
        # user_id = self.kwargs.get("pk")
        user = self.request.user
        return JoinedClub.objects.filter(user=user).order_by("-created_at")


class JoinClub(generics.CreateAPIView[JoinedClub]):
    serializer_class = JoinClubSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer: BaseSerializer[JoinedClub]) -> None:
        club_id = self.kwargs.get("pk")
        club = Club.objects.get(pk=club_id)
        serializer.save(club=club, user=self.request.user)

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        club = Club.objects.get(pk=kwargs["pk"])
        age_groups = club.age_group.all()
        user = request.user
        user_birthdate = user.date_of_birth if isinstance(user, User) else None
        serializer = self.get_serializer(data=request.data)

        if is_user_already_joined(club, user):
            return Response({"error": "You are already a member of this club."}, status=status.HTTP_409_CONFLICT)

        if check_age_condition(age_groups, user_birthdate):
            # if serializer.is_valid():
            #     serializer.save()
            #     return Response(serializer.data, status=status.HTTP_201_CREATED)
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"error": "You do not meet the age requirements to join this club."}, status=status.HTTP_400_BAD_REQUEST
        )
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LeaveClub(generics.DestroyAPIView[JoinedClub]):
    serializer_class = JoinClubSerializer
    permission_classes = [permissions.IsAuthenticated, IsUserOrReadOnly]

    def get_queryset(self) -> QuerySet[JoinedClub]:
        club_id = self.kwargs.get("pk")
        return JoinedClub.objects.filter(club_id=club_id, user=self.request.user)

    # debug 한 유저가 같은 클럽 가입했을때 필요. 나중에 지울것.
    # def destroy(self, request, *args, **kwargs) -> Response:
    #     queryset = self.get_queryset()
    #     if queryset:
    #         self.perform_destroy(queryset.first())
    #         return Response(status=status.HTTP_204_NO_CONTENT)
    #     return Response(status=status.HTTP_404_NOT_FOUND)


# class JoinedClubViewSet(viewsets.ViewSet):
#     def get_object(self, pk):
#         try:
#             return JoinedClub.objects.filter(user_id=pk)
#         except JoinedClub.DoesNotExist:
#             raise Http404
#
#     def list(self, request, user_id) -> Response:
#         joined_clubs = self.get_object(pk=user_id)
#         serializer = JoinedClubSerializer(joined_clubs, many=True)
#         return Response(serializer.data)
#
#     def create(self, request, user_id, club_id) -> Response:
#         serializer = JoinedClubSerializer(context={'request': request, "user_id": user_id, "club_id": club_id})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def destroy(self, request, user_id, club_id) -> Response:
#         try:
#             joined_club = JoinedClub.objects.get(user_id=user_id, club_id=club_id)
#             joined_club.delete()
#             return Response(status.HTTP_204_NO_CONTENT)
#         except JoinedClub.DoesNotExist:
#             return Response(status.HTTP_404_NOT_FOUND)


# class JoinedClubListCreate(generics.ListCreateAPIView[JoinedClub]):
#     queryset = JoinedClub.objects.all()
#     serializer_class = JoinedClubSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]
#
#     def get_queryset(self) -> QuerySet[JoinedClub]:
#         user = self.request.user
#         return self.queryset.filter(user=user)
#
#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)
#
#
# class LeaveClubDestroyView(generics.DestroyAPIView):
#     queryset = JoinedClub.objects.all()
#     serializer_class = JoinedClubSerializer

class MyPostList(generics.ListAPIView):
    serializer_class = MyPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> QuerySet[Post]:
        return Post.objects.filter(writer=self.request.user).order_by("-created_at")


class MyCommentList(generics.ListAPIView):
    serializer_class = MyCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> QuerySet[Comment]:
        return Comment.objects.filter(writer=self.request.user).order_by("-created_at")


class FeedList(generics.ListAPIView):
    serializer_class = FeedSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> QuerySet[Post]:
        user = self.request.user
        # joined_clubs = JoinedClub.objects.filter(user=user)
        # return Post.objects.filter(club=)
        latest_posts = Post.objects.filter(club__joinedclub__user=user).order_by('-created_at')
        return latest_posts