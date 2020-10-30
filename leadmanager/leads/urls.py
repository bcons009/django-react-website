from django.urls import path, include
from rest_framework import routers
from .api import LeadViewSet, GeocodeAPI

router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/geocode', GeocodeAPI.as_view(), name='geocode')
]
