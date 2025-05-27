from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.serializers import ModelSerializer, Serializer, CharField, EmailField, ValidationError


# Serializer użytkownika
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


# Serializer do rejestracji
class RegisterSerializer(Serializer):
    username = CharField()
    email = EmailField()
    password = CharField(write_only=True)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise ValidationError("Użytkownik o tej nazwie już istnieje.")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise ValidationError("Hasło musi mieć co najmniej 8 znaków.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


# Widok rejestracji
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)


# Widok logowania
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": UserSerializer(user).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        return Response({"detail": "Nieprawidłowe dane logowania."},
                        status=status.HTTP_401_UNAUTHORIZED)
