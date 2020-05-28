from django.urls import path, include
from django.conf.urls.static import static

from config import settings

urlpatterns = [
    path("", include(("apps.notes.urls", "api"), namespace="api")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
