from django.urls import path, include
from rest_framework import routers
from .api import OrgLocationViewSet, OrgScheduleViewSet, OrgLocationLLViewSet, UserLocationViewSet, GeocodeAPI, ReverseGeocodeAPI
from django.views.decorators.csrf import csrf_exempt

router = routers.DefaultRouter()
router.register('api/locations', OrgLocationViewSet, 'locations')
router.register('api/schedules', OrgScheduleViewSet, 'schedules')
router.register('api/locationsLL', OrgLocationLLViewSet, 'locationsLL')
router.register('api/userlocs', UserLocationViewSet, 'userlocs')

urlpatterns = router.urls

urlpatterns += [
    # path('api/', include(router.urls)),
    path('api/geocode', GeocodeAPI.as_view(), name='geocode'),
    path('api/revGeocode', ReverseGeocodeAPI.as_view(), name='revGeocode'),
    # path('api/userlocs', csrf_exempt(UserLocationAPI.as_view()), name='userlocs')
]
