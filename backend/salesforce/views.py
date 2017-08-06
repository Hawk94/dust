from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response

from .models import SalesforceCredential, SalesforceAccessToken
from .serializers import SalesforceCredentialSerializer, SalesforceAccessTokenSerializer


class SalesforceCredentialViewSet(mixins.CreateModelMixin,
                                  mixins.ListModelMixin,
                                  mixins.RetrieveModelMixin,
                                  mixins.UpdateModelMixin,
                                  viewsets.GenericViewSet):
    """
    Creates, Updates, and retrives SalesforceCredential objects
    """
    queryset = SalesforceCredential.objects.all()
    serializer_class = SalesforceCredentialSerializer
    permission_classes = (AllowAny,)


class SalesforceAccessTokenViewSet(mixins.CreateModelMixin,
                                   mixins.ListModelMixin,
                                   mixins.RetrieveModelMixin,
                                   mixins.UpdateModelMixin,
                                   viewsets.GenericViewSet):
    """
    Creates, Updates, and retrives SalesforceCredential objects
    """
    queryset = SalesforceAccessToken.objects.all()
    serializer_class = SalesforceAccessTokenSerializer
    permission_classes = (AllowAny,)