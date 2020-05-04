from . import views
from django.urls import path


urlpatterns=[
    path('task-list/',views.taskList,name="task-list"),
    path('task-detail/<str:pk>/',views.taskDetail,name="task-detail"),
    path('task-create/',views.taskCreate,name="task-create"),
    path('task-update/<str:pk>/',views.taskupdate,name="task-update"),
    path('task-delete/<str:pk>/',views.taskDelete,name="task-delete"),
]