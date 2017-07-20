from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import list_route
from rest_framework import filters


from .models import Instruction
from .serializers import CreateInstructionSerializer, InstructionSerializer


class InstructionViewSet(viewsets.ModelViewSet):
    """
    Creates, Updates, and retrives User accounts
    """
    queryset = Instruction.objects.all()
    serializer_class = InstructionSerializer
    filter_fields = ('id', 'amount', 'created_by')

    def create(self, request, *args, **kwargs):
        self.serializer_class = CreateInstructionSerializer
        self.permission_classes = (AllowAny,)
        return super(InstructionViewSet, self).create(request, *args, **kwargs)
