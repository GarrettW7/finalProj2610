from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('todos/', view=views.todos, name="todos"),
    path('todos/<int:id>/', view=views.todo, name="todo")
]
