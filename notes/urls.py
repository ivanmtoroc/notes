"""
Users URLs

The 'urlpatterns' list routes URLs to viewsets
"""

# Django
from django.urls import path
from django.views.generic import TemplateView

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
    path(
        'service-worker.js',
        TemplateView.as_view(
            template_name="service-worker.js",
            content_type='application/javascript'
        ),
        name='service-worker'
    )
]

urlpatterns += ROUTER.urls
