from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=100)  # Short title for the note
    content = models.TextField()              # Body/content of the note
    created_at = models.DateTimeField(auto_now_add=True)  # Auto set when note is created
    
    # Link note to the user who created it
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,          # If user is deleted, delete their notes
        related_name='notes'               # Allows user.notes.all() to fetch all their notes
    )

    def __str__(self):
        return self.title
