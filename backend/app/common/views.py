from django.shortcuts import render
from requests import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse


# @api_view(["GET"])
# def api_root(request, format=None):
#     return Response({
#             "account": reverse("signup", request=request, format=format),
#             "category": reverse("category-list", request=request, format=format)
#     })
