from rest_framework import serializers
from .models import SalesforceCredential, SalesforceAccessToken

class SalesforceCredentialSerializer(serializers.ModelSerializer):

    class Meta:
        model = SalesforceCredential
        fields = ('__all__')

class SalesforceAccessTokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = SalesforceAccessToken
        fields = ['user', 'access_token_url']