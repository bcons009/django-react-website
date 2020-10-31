from django.db import models
from django.contrib.auth.models import User


class OrgLocation(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=250)
    description = models.CharField(max_length=2000)
    cost = models.CharField(max_length=100)
    website = models.URLField()
    email = models.EmailField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=10)      
        # Numbers only, no room for a format like "(xxx) xxx-xxxx"
        # Assumes all phone numbers will be from the US
    last_updated_at = models.DateTimeField(auto_now=True)
    # not included:
        # schedule
        # reviews
        # tags
        # photos?

class OrgSchedule(models.Model):
    location = models.OneToOneField(
        OrgLocation,
        on_delete=models.CASCADE,
        primary_key=True
    )
    sunday = models.CharField(max_length=30)
    monday = models.CharField(max_length=30)
    tuesday = models.CharField(max_length=30)
    wednesday = models.CharField(max_length=30)
    thursday = models.CharField(max_length=30)
    friday = models.CharField(max_length=30)
    saturday = models.CharField(max_length=30)
    last_updated_at = models.DateTimeField(auto_now=True)

class OrgLocationLL(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=250)
    latitude = models.FloatField()
    longitude = models.FloatField()
    description = models.CharField(max_length=2000)
    cost = models.CharField(max_length=100)
    website = models.URLField()
    email = models.EmailField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=10)      
        # Numbers only, no room for a format like "(xxx) xxx-xxxx"
        # Assumes all phone numbers will be from the US
    last_updated_at = models.DateTimeField(auto_now=True)
    # not included:
        # schedule
        # reviews
        # tags
        # photos?
