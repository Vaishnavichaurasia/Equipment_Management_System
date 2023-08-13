from django.db import models
from django.contrib.auth.models import AbstractUser


class District(models.Model):
    id=models.AutoField(primary_key=True)
    code=models.CharField(null=True,blank=True, max_length=255,default='')
    name=models.CharField(null=True,blank=True, max_length=255,default='')
    details=models.TextField(null=True,blank=True,default='')

    def _str_(self):
        return self.name
    

class User(models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(null=True,blank=True, max_length=255,default='')
    email = models.CharField(null=True,blank=True,unique=True, max_length=320,default='')
    password=models.CharField(null=True,blank=True, max_length=255,default='')
    confirm_password=models.CharField(null=True,blank=True, max_length=255,default='')
    mobile_number = models.CharField(null=True,blank=True, unique=True,max_length=10,default='')
    is_district=models.BooleanField(default=False)
    is_vendor=models.BooleanField(default=False)
    is_admin=models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    district_id=models.ForeignKey(District,null=True,blank=True,default='',on_delete=models.CASCADE)
    address = models.TextField(null=True,blank=True)
    city = models.CharField(max_length=255,null=True,blank=True)
    pin_code = models.CharField(max_length=6,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    
class EquipmentType(models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(null=True,blank=True, max_length=255,default='')

class Equipment(models.Model):
    id=models.AutoField(primary_key=True)
    item_type=models.ForeignKey(EquipmentType,null=True,blank=True,default='',on_delete=models.CASCADE)
    name= models.CharField(null=True,blank=True, max_length=255,default='')
    make= models.CharField(null=True,blank=True, max_length=255,default='')
    model= models.CharField(null=True,blank=True, max_length=255,default='')
    serial_number= models.CharField(null=True,blank=True, max_length=255,default='')
    po_number= models.CharField(null=True,blank=True, max_length=255,default='')
    po_value= models.CharField(null=True,blank=True, max_length=20,default='')
    po_date= models.DateTimeField(auto_now_add=True, null=True, blank=True)
    warranty=models.CharField(null=True,blank=True, max_length=255,default='')
    district_id=models.ForeignKey(District,null=True,blank=True,default='',on_delete=models.CASCADE)

class Complain(models.Model):
    id=models.AutoField(primary_key=True)
    user_id=models.ForeignKey(User,null=True,blank=True,default='',on_delete=models.CASCADE)
    complain_number = models.CharField(null=True,blank=True, max_length=255,default='')
    equipment_id= models.ForeignKey(Equipment,null=True,blank=True,default='',on_delete=models.CASCADE)
    issue_date= models.DateTimeField(auto_now_add=True, null=True, blank=True)
    complain_date= models.DateTimeField(auto_now_add=True, null=True, blank=True)
    description=models.CharField(null=True,blank=True, max_length=255,default='')
    attendent_date= models.DateTimeField(auto_now_add=True, null=True, blank=True)
    repair_date= models.DateTimeField(auto_now_add=True, null=True, blank=True)
    status= models.CharField(null=True,blank=True, max_length=255,default='')
    remark= models.CharField(null=True,blank=True, max_length=255,default='')

class Otp(models.Model):
    email = models.CharField(null=True,blank=True, max_length=255,default='')
    otp = models.CharField(max_length=6, default='')
    otptime = models.DateTimeField(auto_now_add=True,null=True, blank=True)
    created_at = models.DateField(auto_now_add=True,blank=True)
