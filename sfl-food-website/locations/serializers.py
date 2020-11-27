from rest_framework import serializers
from locations.models import OrgLocation, OrgSchedule, OrgLocationLL, UserLocation, OrgReview

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

# UserLocation Serializer
class UserLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLocation
        fields = '__all__'

# OrgReview Serializer
class OrgReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgReview
        fields = '__all__'