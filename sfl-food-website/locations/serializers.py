from rest_framework import serializers
from locations.models import OrgLocation, OrgSchedule

# OrgLocation Serializer
class OrgLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgLocation
        fields = '__all__'

# OrgSchedule Serializer
class OrgScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgSchedule
        fields = '__all__'