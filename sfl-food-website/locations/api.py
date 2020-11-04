from locations.models import OrgLocation, OrgSchedule, OrgLocationLL
from rest_framework import viewsets, permissions, generics
from .serializers import OrgLocationSerializer, OrgScheduleSerializer, OrgLocationLLSerializer

from rest_framework.response import Response
import requests
import json

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

# OrgLocationLL ViewSet
class OrgLocationLLViewSet(viewsets.ModelViewSet):
    queryset = OrgLocationLL.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = OrgLocationLLSerializer

# positionstack Geocode API
class GeocodeAPI(generics.GenericAPIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):

        # location = request data
        location = request.data['location']

        # forward geocode location to lat & lng
        api_key = '2de14d5ec4835742c7b6d339ab0b4e29'
        gc_endpoint = f'http://api.positionstack.com/v1/forward?access_key={api_key}&query={location}'
        r = requests.get(gc_endpoint)
        geodata = json.loads(r.content)
        lat = geodata['data'][1]['latitude']
        lng = geodata['data'][1]['longitude']

        # loop through locations in db

        # use pythagorean theorem to compute distance
        # between user location and db location

        # if distance is less than max_distance add
        # it to in_range list

        # return in_range
        return Response({
            "latitude": lat,
            "longitude": lng
        })