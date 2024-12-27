from django.db import models

# Create your models here.
class Books(models.Model):
    title=models.CharField(max_length=250)
    author=models.CharField(max_length=250)
    description = models.CharField(max_length=5000)
    image=models.ImageField(upload_to='book/', null=True, blank=True)

    def __str__(self):
        return self.title