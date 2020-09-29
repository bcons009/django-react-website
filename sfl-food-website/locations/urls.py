from rest_framework import routers
from .api import OrgLocationViewSet

router = routers.DefaultRouter()
router.register('api/locations', OrgLocationViewSet, 'locations')

urlpatterns = router.urls