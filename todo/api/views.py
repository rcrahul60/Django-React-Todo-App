from .serializers import TaskSerializer
from .models import Task
from rest_framework.views import View
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework import status

@api_view(['GET'])
def taskList(request):
    task=Task.objects.all().order_by('-id')
    serializer=TaskSerializer(task,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def taskDetail(request,pk):
    #print(">>>>>>>>>>>>>>>>>>>>this")
    task=Task.objects.get(id=pk)
    serializer=TaskSerializer(task)
    return Response(serializer.data)


@api_view(['POST'])
def taskCreate(request):
    serializer=TaskSerializer(data=request.data)
    #try:
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
#except Exception as e:
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    #return Response(serializer.data)

@api_view(['POST'])
def taskupdate(request,pk):
    task=Task.objects.get(id=pk)
    serializer=TaskSerializer(instance=task,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(request, pk):
	task = Task.objects.get(id=pk)
	task.delete()
	return Response('Item succsesfully delete!')





