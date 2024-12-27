from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, BookSerializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Books


# Create your views here.

class BookListCreate(generics.ListCreateAPIView):
    serializer_class = BookSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Books.objects.all()

    def perform_create(self, serializer):
        serializer.save()

class BookUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = BookSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Books.objects.filter(id=self.kwargs['pk'])

    def perform_update(self, serializer):
        serializer.save()
        
class BookRetrieve(generics.RetrieveAPIView):
    queryset = Books.objects.all()
    serializer_class = BookSerializers       

class BookDelete(generics.DestroyAPIView):
    serializer_class = BookSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Books.objects.all()


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
