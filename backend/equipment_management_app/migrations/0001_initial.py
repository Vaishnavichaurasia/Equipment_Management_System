# Generated by Django 3.2.12 on 2023-08-13 20:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('code', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('name', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('details', models.TextField(blank=True, default='', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='EquipmentType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, default='', max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Otp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('otp', models.CharField(default='', max_length=6)),
                ('otptime', models.DateTimeField(auto_now_add=True, null=True)),
                ('created_at', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('email', models.CharField(blank=True, default='', max_length=320, null=True, unique=True)),
                ('password', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('confirm_password', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('mobile_number', models.CharField(blank=True, default='', max_length=10, null=True, unique=True)),
                ('is_district', models.BooleanField(default=False)),
                ('is_vendor', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=False)),
                ('address', models.TextField(blank=True, null=True)),
                ('city', models.CharField(blank=True, max_length=255, null=True)),
                ('pin_code', models.CharField(blank=True, max_length=6, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('district_id', models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, to='equipment_management_app.district')),
            ],
        ),
        migrations.CreateModel(
            name='Equipment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('make', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('model', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('serial_number', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('po_number', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('po_value', models.CharField(blank=True, default='', max_length=20, null=True)),
                ('po_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('warranty', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('district_id', models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, to='equipment_management_app.district')),
                ('item_type', models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, to='equipment_management_app.equipmenttype')),
            ],
        ),
        migrations.CreateModel(
            name='Complain',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('complain_number', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('issue_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('complain_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('description', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('attendent_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('repair_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('status', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('remark', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('equipment_id', models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, to='equipment_management_app.equipment')),
                ('user_id', models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, to='equipment_management_app.user')),
            ],
        ),
    ]
