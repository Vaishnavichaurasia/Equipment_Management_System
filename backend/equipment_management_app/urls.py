
from django.contrib import admin
from django.urls import path,include
from .views import *
urlpatterns = [
    path('register-user/',UserAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('validate-token/', ValidateToken.as_view()),
    path('district-list/', DistrictListAPI.as_view()),
    path('save-otp/', OtpAPI.as_view()),
    path('update-password/', UpdatePassword.as_view()),

    path('equipment-type-count/',EquipmentTypeAPI.as_view()),
    path('equipment-type-list/',EquipmentTypeAPI.as_view()),

    path('equipment-type-details/<int:equipmentTypeID>',EquipmentTypeDetailsAPI.as_view()),
    path('equipment-type-details/',EquipmentTypeDetailsAPI.as_view()),


]
 