from django.urls import path
from .views import (
    ProfileDetailView,
    ProjectListView,
    ProjectDetailView,
    BlogPostListView,
    BlogPostDetailView,
    ContactMessageCreateView
)

urlpatterns = [
    path('profile/', ProfileDetailView.as_view(), name='profile-detail'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('blogs/', BlogPostListView.as_view(), name='blog-list'),
    path('blogs/<slug:slug>/', BlogPostDetailView.as_view(), name='blog-detail'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact-create'),
]