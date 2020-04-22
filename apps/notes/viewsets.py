from rest_framework import viewsets

from apps.notes.models import Note
from apps.notes.serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    """
    Note viewset
    """

    queryset = Note.objects.all()
    serializer_class = NoteSerializer
