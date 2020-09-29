from locations.models import OrgLocation
from rest_framework import viewsets, permissions
from .serializers import OrgLocationSerializer

# OrgLocation ViewSet
class OrgLocationViewSet(viewsets.ModelViewSet):
    queryset = OrgLocation.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = OrgLocationSerializer