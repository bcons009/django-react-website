from rest_framework import serializers
from locations.models import OrgLocation

# OrgLocation Serializer
class OrgLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgLocation
        fields = '__all__'