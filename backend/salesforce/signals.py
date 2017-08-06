from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from requests_oauthlib import OAuth2Session
from .models import SalesforceAccessToken, SalesforceCredential


@receiver(post_save, sender=SalesforceAccessToken)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        oauth = OAuth2Session(client_id=settings.SALESFORCE_CONSUMER_KEY, redirect_uri=settings.SALESFORCE_REDIRECT_URI)
        token = oauth.fetch_token(settings.SALESFORCE_BASE_URL + '/token', client_secret=settings.SALESFORCE_CONSUMER_SECRET,
                                  authorization_response=instance.url)

        SalesforceCredential.objects.create(user=instance.user,
                                            id_url = token['id'],
                                            issued_at = token['issued_at'],
                                            scope = token['scope'],
                                            instance_url = token['instance_url'],
                                            token_type = token['token_type'],
                                            refresh_token = token['refresh_token'],
                                            id_token = token['id_token'],
                                            signature = token['signature'],
                                            access_token = token['access_token'])