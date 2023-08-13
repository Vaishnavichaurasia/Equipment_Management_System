from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display=["id","name","is_vendor","is_district","is_admin","is_active"]

@admin.register(EquipmentType)
class UserAdmin(admin.ModelAdmin):
    list_display=["id","name"]