from django.db import models
from users.models import User


class Instruction(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, related_name='instructions', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=5, decimal_places=2)
    BTC_split = models.DecimalField(max_digits=2, decimal_places=2)
    ETH_split = models.DecimalField(max_digits=2, decimal_places=2)
    LTC_split = models.DecimalField(max_digits=2, decimal_places=2)

    class Meta:
        ordering = ('created_at',)