from django.core import serializers
from locations.models import OrgLocation, OrgSchedule, OrgLocationLL, UserLocation, LocationReviews
from rest_framework import viewsets, permissions, generics
from .serializers import OrgLocationSerializer, OrgScheduleSerializer, OrgLocationLLSerializer, UserLocationSerializer, LocationReviewsSerializer

from rest_framework.response import Response
import requests
import json
from geopy import distance

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

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = LocationReviews.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = LocationReviewsSerializer

class SubmitReviewAPI(generics.GenericAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = LocationReviewsSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        review = serializer.save()
        return Response({
                        "review": LocationReviewsSerializer(review, context=self.get_serializer_context()).data,
                        })


# Geocode Route for Search
class GeocodeAPI(generics.GenericAPIView):

    authentication_classes = []
    permission_classes = []

    def as_json(self, loc):
        return dict(
            name=loc.name,
            address=loc.address,
            latitude=loc.latitude,
            longitude=loc.longitude,
            description=loc.description,
            cost=loc.cost,
            website=loc.website,
            email=loc.email,
            phone_number=loc.phone_number,
            last_updated_at=loc.last_updated_at,
            id=loc.id,
        )

    def get(self, request, *args, **kwargs):
        queryset = OrgLocationLL.objects.all()
        location = request.query_params['location']
        distance = int(request.query_params['distance'])

        # if distance == 0, then user selected 'Near Me' option, which defaults to 5 miles
        max_distance = 5
        if(distance != 0):
            max_distance = distance

        print(max_distance)

        in_range = GetLocationsInRange(queryset, location, max_distance)

        # convert python list to json
        # parsed = json.loads(in_range)
        # json_in_range = json.dumps(parsed)
        if not in_range:
            return Response('no results')

        print(in_range[0].pk)

        # return in_range
        res = [self.as_json(loc) for loc in in_range]
        return Response(res)


class ReverseGeocodeAPI(generics.GenericAPIView):

    authentication_classes = []
    permission_classes = []

    def as_json(self, loc):
        return dict(
            location=loc
        )

    def get(self, request, *args, **kwargs):
        latitude = request.query_params['latitude']
        longitude = request.query_params['longitude']

        api_key = "2de14d5ec4835742c7b6d339ab0b4e29"
        endpoint = f'http://api.positionstack.com/v1/reverse?access_key={api_key}&query={latitude},{longitude}&output=json'
        r = requests.get(endpoint)
        content = json.loads(r.content)
        print(content['data'][0]['name'])
        location = content['data'][0]['name']

        res = self.as_json(location)
        return Response(res)


# GetLocationsInRange --- Helper Function
# Find all locations that are within the range defined by the user
# If "Near Me" is selected, default max_distance = 5
def GetLocationsInRange(queryset, location, max_distance):

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
            in_range.append(loc)
            print(loc)

    data = in_range
    return data
