# Generated by Django 3.0.4 on 2020-04-25 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='description',
            field=models.CharField(default='this is des', max_length=200),
            preserve_default=False,
        ),
    ]