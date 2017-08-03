from rest_framework import serializers
from .models import SalesforceCredential

class SalesforceCredentialSerializer(serializers.ModelSerializer):

    class Meta:
        model = SalesforceCredential
        fields = ('__all__')
