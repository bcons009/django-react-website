from rest_framework import serializers
from leads.models import OrgLocation, OrgSchedule, OrgLocationLL

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

# OrgLocationLL Serializer
class OrgLocationLLSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgLocationLL
        fields = '__all__'
