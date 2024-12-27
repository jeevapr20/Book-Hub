from django.urls import path
from . import views

urlpatterns=[
    path("books/", views.BookListCreate.as_view(), name="book-list"),
    path('books/<int:pk>/', views.BookRetrieve.as_view(), name='retrieve-book'),
    path("books/update/<int:pk>/", views.BookUpdate.as_view(), name="update-book"),
    path("books/delete/<int:pk>/", views.BookDelete.as_view(), name="delete-book"),
]