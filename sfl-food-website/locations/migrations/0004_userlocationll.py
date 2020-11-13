# Generated by Django 3.0.5 on 2020-11-04 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0003_orglocationll'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserLocationLL',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=250)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('description', models.CharField(max_length=2000)),
                ('email', models.EmailField(max_length=100)),
                ('phone_number', models.CharField(max_length=14)),
                ('last_updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]