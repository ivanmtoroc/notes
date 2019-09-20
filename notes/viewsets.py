"""
Notes viewsets

Viewsets to notes serializers
"""

# Django Rest Framework
from rest_framework import viewsets

# Notes serializers
from notes.serializers import NoteSerializer

# Notes models
from notes.models import Note


class NoteViewSet(viewsets.ModelViewSet):
    """
    Note viewset

    CRUD views of the Note serializer
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
