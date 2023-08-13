from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException, AuthenticationFailed
from .authentication import *
from .models import *
from .serializers import *
from django.contrib.auth.hashers import make_password, check_password
from .send_mail import *
from django.db.models import Q
from django.core.paginator import Paginator



class UserAPI(APIView):
    def post(self, request, format=None):
        userSerializer = UserSerializer(data=request.data)
        if userSerializer.is_valid():
            userSerializer.save()
            return Response({'msg':'Registered Successfully'},200)
        return Response({'error':userSerializer.errors},200)

class LoginAPI(APIView):
    def post(self, request):
        user = User.objects.filter(email = request.data.get('email')).first()
        
        response = Response()
        if not user:
            response.data = {
                'invalid': 'Invalid email or password'
            }
            return response
        
        if request.data.get('password') != user.password:
            response.data = {
                'invalid': 'Invalid email or password'
            }
            return response
        if user.is_active==False:
            response.data = {
                'notAproved': 'Please wait for approval'
            }
            return response
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        response = Response()
        response.set_cookie(key='refreshToken', value=refresh_token)
        userData = User.objects.get(email = request.data.get('email'))
        userSerializer =UserSerializer(userData)
        response.data = {
            'token': access_token,
            'refreshToken': refresh_token,
            'userData': userSerializer.data,
        }
        return response
    
class ValidateToken(APIView):
    def post(self,request):
        try:
         user=decode_refresh_token(request.data['refresh'])
         access=create_access_token(user)
         refresh=create_refresh_token(user)
         tokens={
             "access_token":access,
             "refresh_token":refresh
         }
         return Response(tokens)
        except:
            return Response(False)
        
class DistrictListAPI(APIView):
    def get(self,request):
        districtList=District.objects.all()
        districtListSerializer=DistrictSerializer(districtList,many=True)
        return Response({'districtList':districtListSerializer.data},200)



class OtpAPI(APIView):
    def post(self ,request):
        email= request.data.get('email')
        userData=User.objects.filter(email=email).count()
        if userData>0:
            userObj = User.objects.get(email=email)
            serializer=OtpSerializer(userObj,data=request.data)
            if serializer.is_valid():
                serializer.save()
                send_otp_via_email(email)
                data=dict()
                data["msg"]="OTP is sent successfully. Please check your email"
                data["mail"]=email
                response=Response(data, status=200)
                return response
        else:
            data=dict()
            data["error"]="Entered email is not registered"
            response=Response(data, status=200)
            return response

class UpdatePassword(APIView):
    def put(self, request):
        email=request.data.get('email')
        otp = request.data.get('otp')
        otp_obj = Otp.objects.filter(email=email, otp=otp)
        if(otp_obj):
            createdTs=otp_obj[0].otptime
            from datetime import datetime,timedelta
            from django.utils import timezone
            currentTs=timezone.now()
            expTime=(createdTs+timedelta(minutes=5))
            if(currentTs>expTime):
                data=dict()
                data["error"]="OTP Expired"
                response=Response(data, status=200)
                return response
            else:
                otpObj = User.objects.get(email=email)
                otpObj.password = request.data["password"]
                otpObj.confirm_password = request.data["password"]
                otpObj.save()
                data=dict()
                data["msg"]="Password successfully changed"
                response=Response(data, status=200)
                return response
        else:
            data=dict()
            data["error"]="Entered OTP is wrong"
            response=Response(data, status=200)
            return response

class EquipmentTypeAPI(APIView):
    
    def get(self,request):
         equipmentTypeCount=EquipmentType.objects.all().count() 
         return Response({
            "msg":"success",
            "equipmentTypeCount":equipmentTypeCount,
        })
    
    def post(self,request):
        paginationDetails=request.data['paginationDetails']
        columnToSort=request.data['columnToSort']
        columnSortingOrder=request.data['columnSortingOrder']
        currentPage=paginationDetails['currentPage']
        listPerPage=paginationDetails['listPerPage']

        searchText=request.data['searchText']

        equipmentTypeList=[]

        if columnToSort == "":
            equipmentTypeList = EquipmentType.objects.all()

        if searchText:
            equipmentTypeList=EquipmentType.objects.filter(Q(name__icontains=searchText) )
        else:
            equipmentTypeList = EquipmentType.objects.all()        
        
        if columnToSort == "name" and columnSortingOrder=="ascending":
            equipmentTypeList = equipmentTypeList.order_by('name')
        if columnToSort == "name" and columnSortingOrder=="descending":
            equipmentTypeList = equipmentTypeList.order_by('-name')
        
        
        equipmentTypeListCount=equipmentTypeList.count()

        paginator = Paginator(equipmentTypeList, listPerPage)
        filteredEquipmentTypeList = paginator.page(currentPage)

        equipmentTypeListSerializer = EquipmentTypeSerializer(filteredEquipmentTypeList, many =True)
        return Response({
            "msg":"success",
            "equipmentTypeList":equipmentTypeListSerializer.data,
            "equipmentTypeListCount":equipmentTypeListCount,
        })
    
class EquipmentTypeDetailsAPI(APIView):
    def get(self,request,equipmentTypeID):
        if equipmentTypeID:
            equipmentType=EquipmentType.objects.get(id=equipmentTypeID)
        else:
            equipmentType= None

        if equipmentType:
            equipmentTypeSerializer=EquipmentTypeSerializer(equipmentType)
            equipmentType=equipmentTypeSerializer.data
        else:
            equipmentType={}  
       
        return Response({"msg":"success","equipmentType":equipmentType})
    
    def post(self,request):
        if "id" in request.data :
            obj = EquipmentType.objects.get(id=request.data["id"])
            equipmentTypeSerializer = EquipmentTypeSerializer(obj, data=request.data,partial=True)
        else :
            equipmentTypeSerializer = EquipmentTypeSerializer(data=request.data)

        if equipmentTypeSerializer.is_valid():
            equipmentTypeSerializer.save()
            return Response({"msg": "Saved Successfully" }, status=status.HTTP_201_CREATED)
        return Response({"error": equipmentTypeSerializer.errors}, status=status.HTTP_400_BAD_REQUEST)
      