from django.contrib import admin
from django.urls import path, include, re_path
from frontend import views

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('locations.urls')),
    path('', include('accounts.urls')),
    path('admin', admin.site.urls),
    re_path(r'^(?:.*)/?$', views.index)
]
