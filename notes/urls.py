"""
Users URLs

The 'urlpatterns' list routes URLs to viewsets
"""

# Django
from django.urls import path

# Django Rest Framework
from rest_framework import routers

# Notes viewsets
from notes.viewsets import NoteViewSet

# Notes views
from notes.views import vue


ROUTER = routers.DefaultRouter()

ROUTER.register(r'notes', NoteViewSet)

urlpatterns = [
    path('', vue, name='vue'),
]

urlpatterns += ROUTER.urls
