from django.urls import path
from . import views

urlpatterns = [
    # List all notes and create a new note
    path('notes/', views.NoteListCreateView.as_view(), name='note-list'),

    # Delete a specific note by ID (primary key)
    path('notes/delete/<int:pk>/', views.NoteDeleteView.as_view(), name='note-delete'),
]
