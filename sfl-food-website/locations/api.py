from locations.models import OrgLocation, OrgSchedule, OrgLocationLL, UserLocation
from rest_framework import viewsets, permissions, generics, mixins
from .serializers import OrgLocationSerializer, OrgScheduleSerializer, OrgLocationLLSerializer, UserLocationSerializer

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

# UserLocation ViewSet
class UserLocationViewSet(viewsets.ModelViewSet):
    queryset = UserLocation.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserLocationSerializer

class GeocodeAPI(generics.GenericAPIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        queryset = OrgLocationLL.objects.all()
        location = request.data['location']

        # if distance == 0, then user selected 'Near Me' option, which defaults to 5 miles
        if(request.data['distance'] != 0):
            max_distance = request.data['distance']
            in_range = GetLocationsInRange(queryset, location, max_distance)

        else:
            in_range = GetLocationsInRange(queryset, location)

        # convert python list to json
        json_in_range = json.dumps(in_range)

        # return in_range
        return Response(json_in_range)



# GetLocationsInRange --- Helper Function
# Find all locations that are within the range defined by the user
# If "Near Me" is selected, default max_distance = 5
def GetLocationsInRange(queryset, location, max_distance=5):

    # Get the coordinates of user location using positionstack API
    api_key = '2de14d5ec4835742c7b6d339ab0b4e29'
    endpoint = f'http://api.positionstack.com/v1/forward?access_key={api_key}&query={location}'
    r = requests.get(endpoint)
    geodata = json.loads(r.content)
    lat = geodata['data'][1]['latitude']
    lng = geodata['data'][1]['longitude']
    user_location = (lat, lng)

    # List to hold locations that are in range
    in_range = []

    # loop through locations in database
    for loc in queryset:
        org_location = (loc.latitude, loc.longitude)

        # use geopy python library to compute distance between each location
        dist = round(distance.distance(user_location, org_location).miles, 1)

        # add to in_range if in range
        if(dist <= max_distance):
            in_range.append(loc.name)
            print(loc.name)


    return in_range
