# Generated by Django 5.1.4 on 2024-12-20 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Books",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=250)),
                ("author", models.CharField(max_length=250)),
                ("description", models.CharField(max_length=5000)),
                ("image", models.ImageField(blank=True, null=True, upload_to="book/")),
            ],
        ),
    ]
