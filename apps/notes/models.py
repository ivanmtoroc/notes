from django.contrib.humanize.templatetags import humanize
from django.db import models

from core.models import Base as BaseModel


class Note(BaseModel):
    """
    Note model
    """

    title = models.CharField(max_length=100)
    body = models.TextField()

    def human_date(self):
        return humanize.naturaltime(self.modified_at)

    class Meta:
        ordering = ["-modified_at"]
