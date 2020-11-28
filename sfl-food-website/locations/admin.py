from django.contrib import admin
from .models import OrgLocation, OrgLocationLL, OrgSchedule, UserLocation, LocationReviews

# Register your models here.
admin.site.register(OrgLocation)
admin.site.register(OrgLocationLL)
admin.site.register(OrgSchedule)
admin.site.register(UserLocation)
admin.site.register(LocationReviews)