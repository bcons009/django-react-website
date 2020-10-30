from rest_framework import routers
from .api import OrgLocationViewSet, OrgScheduleViewSet, OrgLocationLLViewSet

router = routers.DefaultRouter()
router.register('api/locations', OrgLocationViewSet, 'locations')
router.register('api/schedules', OrgScheduleViewSet, 'schedules')
router.register('api/locationsLL', OrgLocationLLViewSet, 'locationsLL')

urlpatterns = router.urls