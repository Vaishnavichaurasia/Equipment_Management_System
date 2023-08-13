from rest_framework import serializers
from .models import *

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model=District
        fields="__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields="__all__"

class EquipmentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model=EquipmentType
        fields="__all__"        

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Equipment
        fields="__all__"      

class ComplainSerializer(serializers.ModelSerializer):
    class Meta:
        model=Complain
        fields="__all__"               

class OtpSerializer(serializers.ModelSerializer):
    class Meta:
        model=Otp
        fields=["email"]