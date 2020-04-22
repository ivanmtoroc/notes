from django.urls import path, include
from django.views.generic import TemplateView


urlpatterns = [
    path("api/", include(("apps.notes.urls", "api"), namespace="api")),
    path("", TemplateView.as_view(template_name="index.html"), name="index"),
    path(
        "service-worker.js",
        TemplateView.as_view(
            template_name="service-worker.js", content_type="application/javascript"
        ),
        name="service-worker",
    ),
]
