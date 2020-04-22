from rest_framework import serializers

from apps.notes.models import Note


class NoteSerializer(serializers.ModelSerializer):
    """
    Note serializer
    """

    class Meta:
        model = Note
        fields = ("id", "human_date", "title", "body")
