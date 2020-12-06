from django.db import models
from django.contrib.auth.models import User

# class Lead(models.Model):
#    name = models.CharField(max_length=100)
#    email = models.EmailField(max_length=100, unique=True)
#    message = models.CharField(max_length=500, blank=True)
#    created_at = models.DateTimeField(auto_now_add=True)

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
        # photos (Google Maps Places API)

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
        # photos (Google Maps Places API)

    def __str__(self):
        return self.name

class OrgSchedule(models.Model):
    location = models.OneToOneField(
        OrgLocationLL,
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

    def __str__(self):
        return self.location

class UserLocation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=250)
    latitude = models.FloatField()
    longitude = models.FloatField()
    description = models.CharField(max_length=2000)
    tags = models.CharField(max_length=2000, default='')
    date = models.DateField(default='2020-01-01')
    start_time = models.TimeField(default='00:00')
    end_time = models.TimeField(default='00:00')
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=14)
    last_updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

DEFAULT_USER_ID = 18
class LocationReviews(models.Model):
    location = models.ForeignKey(
        OrgLocationLL,
        related_name='reviews',
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=DEFAULT_USER_ID)
    title = models.CharField(max_length=100)
    rating = models.IntegerField()
    review = models.CharField(max_length=2000)
    last_updated_at = models.DateTimeField(auto_now=True)
