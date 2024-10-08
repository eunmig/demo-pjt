from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateTimeField()
    description = models.TextField(null=True, blank=True)
