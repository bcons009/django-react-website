from django.urls import path, include
from rest_framework import routers
from .api import OrgLocationViewSet, OrgScheduleViewSet, OrgLocationLLViewSet, GeocodeAPI

router = routers.DefaultRouter()
router.register('api/locations', OrgLocationViewSet, 'locations')
router.register('api/schedules', OrgScheduleViewSet, 'schedules')
router.register('api/locationsLL', OrgLocationLLViewSet, 'locationsLL')

urlpatterns = router.urls

urlpatterns += [
    # path('api/', include(router.urls)),
    path('api/geocode', GeocodeAPI.as_view(), name='geocode')
]