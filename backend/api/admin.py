from django.contrib import admin
from .models import Profile, Project, BlogPost, ContactMessage

# Modern styled admin headers matching palette
admin.site.site_header = "Portfolio Control Center"
admin.site.site_title = "Admin Dashboard"
admin.site.index_title = "Manage Content & Messages"

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'tagline')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'featured', 'created_at', 'live_demo_url')
    list_filter = ('featured', 'created_at')
    search_fields = ('title', 'tags')

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    prepopulated_fields = {'slug': ('title',)}
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'cover_image')
        }),
        ('Section 1 (Required)', {
            'fields': ('headline_1', 'description_1', 'image_1')
        }),
        ('Section 2 (Optional)', {
            'classes': ('collapse',),
            'fields': ('headline_2', 'description_2', 'image_2')
        }),
        ('Section 3 (Optional)', {
            'classes': ('collapse',),
            'fields': ('headline_3', 'description_3', 'image_3')
        }),
        ('Section 4 (Optional)', {
            'classes': ('collapse',),
            'fields': ('headline_4', 'description_4', 'image_4')
        }),
        ('Section 5 (Optional)', {
            'classes': ('collapse',),
            'fields': ('headline_5', 'description_5', 'image_5')
        }),
        ('Section 6 (Optional)', {
            'classes': ('collapse',),
            'fields': ('headline_6', 'description_6', 'image_6')
        }),
    )

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'sent_at')
    readonly_fields = ('name', 'email', 'subject', 'message', 'sent_at')