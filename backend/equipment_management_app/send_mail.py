from django.core.mail import send_mail
import random
from django.conf import settings
from .models import Otp

def send_otp_via_email(userEmail):
    Otp.objects.filter(email=userEmail).delete()
    otp = random.randint(1000,9999)
    otp_created = Otp.objects.create(
        email = userEmail,
        otp = otp
    )
    subject = 'Your account verification email'
    message = f'Hello, Please use following verification code, to update your password.\n {otp} \n Thanks..!!'
    email_from = settings.EMAIL_HOST
    send_mail(subject,message,email_from, [userEmail])
