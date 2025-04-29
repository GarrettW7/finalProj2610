from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('todos/', view=views.todos, name="todos"),
    path('todos/<int:id>/', view=views.todo, name="todo"),
    path('test/', views.test_view, name='test'),  # Add this line
    path('jarvis/', views.talkToJarvis, name='talkToJarvis'),  # Add this line
]
