from locations.models import OrgLocation, OrgSchedule
from rest_framework import viewsets, permissions
from .serializers import OrgLocationSerializer, OrgScheduleSerializer

# OrgLocation ViewSet
class OrgLocationViewSet(viewsets.ModelViewSet):
    queryset = OrgLocation.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = OrgLocationSerializer

# OrgSchedule ViewSet
class OrgScheduleViewSet(viewsets.ModelViewSet):
    queryset = OrgSchedule.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = OrgScheduleSerializer