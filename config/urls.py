from django.conf import settings
from django.conf.urls import include, url
from django.urls import reverse_lazy
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import RedirectView
from django.views import defaults as default_views

from rest_framework.routers import DefaultRouter
from users.views import UserViewSet
from instructions.views import InstructionViewSet
from salesforce.views import SalesforceCredentialViewSet, SalesforceAccessTokenViewSet
from backend.views import FrontendAppView

from rest_framework.authtoken import views


router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'credentials', SalesforceCredentialViewSet)
router.register(r'access_tokens', SalesforceAccessTokenViewSet)
router.register(r'instructions', InstructionViewSet)


urlpatterns = [
    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    # url(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False), name='home'),

    # Django Admin, use {% url 'admin:index' %}
    url(settings.ADMIN_URL, admin.site.urls),

    # Your stuff: custom urls includes go here
    url(r'^authentication', views.obtain_auth_token, name='authentication'),
    url(r'^auth/', include('djoser.urls.authtoken'), name='auth'),
    url(r'^api/v1/', include(router.urls)),
    url(r'^', FrontendAppView.as_view(), name='home'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        url(r'^400/$', default_views.bad_request, kwargs={'exception': Exception('Bad Request!')}),
        url(r'^403/$', default_views.permission_denied, kwargs={'exception': Exception('Permission Denied')}),
        url(r'^404/$', default_views.page_not_found, kwargs={'exception': Exception('Page not Found')}),
        url(r'^500/$', default_views.server_error),
    ]
    if 'debug_toolbar' in settings.INSTALLED_APPS:
        import debug_toolbar
        urlpatterns = [
            url(r'^__debug__/', include(debug_toolbar.urls)),
        ] + urlpatterns
