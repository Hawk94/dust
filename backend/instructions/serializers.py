from rest_framework import serializers

from .models import Instruction

class InstructionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instruction
        fields = ('id', 'created_at', 'created_by', 'amount', 'BTC_split', 'ETH_split', 'LTC_split')


class CreateInstructionSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        # call create_user on user object. Without this
        # the password will be stored in plain text.
        instruction = Instruction.objects.create(**validated_data)
        return instruction

    class Meta:
        model = Instruction
        fields = ('id', 'created_by', 'amount', 'BTC_split', 'ETH_split', 'LTC_split')
