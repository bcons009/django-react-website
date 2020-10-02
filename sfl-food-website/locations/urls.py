from rest_framework import routers
from .api import OrgLocationViewSet, OrgScheduleViewSet

router = routers.DefaultRouter()
router.register('api/locations', OrgLocationViewSet, 'locations')
router.register('api/schedules', OrgScheduleViewSet, 'schedules')

urlpatterns = router.urls