from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # User registration endpoint
    path('api/user/register/', CreateUserView.as_view(), name='register'),

    # JWT token endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),

    # Built-in DRF auth URLs (for login/logout in browser)
    path('api/auth/', include('rest_framework.urls')),
]
