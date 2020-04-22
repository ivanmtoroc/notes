from rest_framework import routers

from apps.notes.viewsets import NoteViewSet


ROUTER = routers.DefaultRouter()

ROUTER.register(r"notes", NoteViewSet)

urlpatterns = ROUTER.urls
