from rest_framework import serializers
from .models import Profile, Project, BlogPost, ContactMessage
import urllib.parse


class ProfileSerializer(serializers.ModelSerializer):
    hero_cover_image = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = '__all__'

    def get_hero_cover_image(self, obj):
        request = self.context.get('request')
        if obj.hero_cover_image:
            if request:
                return request.build_absolute_uri(obj.hero_cover_image.url)
            return obj.hero_cover_image.url
        return None

    def get_avatar(self, obj):
        request = self.context.get('request')
        if obj.avatar:
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None


class ProjectSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = '__all__'

    def get_image(self, obj):
        # 1. If custom image was uploaded, return full absolute URL
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url

        # 2. Otherwise, take screenshot directly from live homepage URL
        if obj.live_demo_url:
            encoded_url = urllib.parse.quote_plus(obj.live_demo_url)
            return f"https://api.microlink.io/?url={encoded_url}&screenshot=true&meta=false&embed=screenshot.url"

        # 3. Fallback default image
        return "https://images.unsplash.com/photo-1555066931-4365d14bab8c"


class BlogPostSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()
    image_1 = serializers.SerializerMethodField()
    image_2 = serializers.SerializerMethodField()
    image_3 = serializers.SerializerMethodField()
    image_4 = serializers.SerializerMethodField()
    image_5 = serializers.SerializerMethodField()
    image_6 = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = '__all__'

    def _get_absolute_image_url(self, image_field):
        if image_field:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(image_field.url)
            return image_field.url
        return None

    def get_cover_image(self, obj):
        return self._get_absolute_image_url(obj.cover_image)

    def get_image_1(self, obj):
        return self._get_absolute_image_url(obj.image_1)

    def get_image_2(self, obj):
        return self._get_absolute_image_url(obj.image_2)

    def get_image_3(self, obj):
        return self._get_absolute_image_url(obj.image_3)

    def get_image_4(self, obj):
        return self._get_absolute_image_url(obj.image_4)

    def get_image_5(self, obj):
        return self._get_absolute_image_url(obj.image_5)

    def get_image_6(self, obj):
        return self._get_absolute_image_url(obj.image_6)


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'