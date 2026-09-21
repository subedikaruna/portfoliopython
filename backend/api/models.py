from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=255)
    bio = models.TextField()
    hero_cover_image = models.ImageField(upload_to='profile/', blank=True, null=True) # Optional
    avatar = models.ImageField(upload_to='profile/', blank=True, null=True) # Optional
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True) # Optional (Auto-screenshot fallback)
    tags = models.CharField(max_length=200, help_text="Comma separated tags e.g. React, Django, Tailwind")
    live_demo_url = models.URLField(help_text="Link to Vercel, Render, Netlify, etc.")
    github_url = models.URLField(blank=True, null=True)
    featured = models.BooleanField(default=False, help_text="Check to feature on home page (up to 3)")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    cover_image = models.ImageField(upload_to='blogs/covers/', blank=True, null=True) # Optional
    created_at = models.DateTimeField(auto_now_add=True)

    # Modular Content Block 1
    headline_1 = models.CharField(max_length=255)
    description_1 = models.TextField()
    image_1 = models.ImageField(upload_to='blogs/sections/', blank=True, null=True)

    # Block 2
    headline_2 = models.CharField(max_length=255, blank=True, null=True)
    description_2 = models.TextField(blank=True, null=True)
    image_2 = models.ImageField(upload_to='blogs/sections/', blank=True, null=True)

    # Block 3
    headline_3 = models.CharField(max_length=255, blank=True, null=True)
    description_3 = models.TextField(blank=True, null=True)
    image_3 = models.ImageField(upload_to='blogs/sections/', blank=True, null=True)

    # Block 4
    headline_4 = models.CharField(max_length=255, blank=True, null=True)
    description_4 = models.TextField(blank=True, null=True)
    image_4 = models.ImageField(upload_to='blogs/sections/', blank=True, null=True)

    # Block 5
    headline_5 = models.CharField(max_length=255, blank=True, null=True)
    description_5 = models.TextField(blank=True, null=True)
    image_5 = models.ImageField(upload_to='blogs/sections/', blank=True, null=True)

    # Block 6
    headline_6 = models.CharField(max_length=255, blank=True, null=True)
    description_6 = models.TextField(blank=True, null=True)
    image_6 = models.ImageField(upload_to='blogs/sections/', blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"