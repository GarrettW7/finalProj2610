from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from .models import Todo
import json
from django.http import JsonResponse
from django.forms.models import model_to_dict
import time

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)


@login_required
def todos(req):
    if req.method == "POST":
        body = json.loads(req.body)
        todo = Todo.objects.create(
            title=body["title"],
            description=body["description"],
            completed=False,
            user=req.user
        )
        return JsonResponse({"todo": model_to_dict(todo)})


    todos = req.user.todo_set.all()
    return JsonResponse({"todos": [model_to_dict(todo) for todo in todos]})

@login_required
def todo(req, id):
    if req.method == "PUT":
        time.sleep(3)
        notavariable.doThing()
        body = json.loads(req.body)
        todo = Todo.objects.get(id=id)
        todo.completed = body["completed"]
        todo.save()
        return JsonResponse({"todo": model_to_dict(todo)})
    if req.method == "DELETE":
        todo = Todo.objects.get(id=id)
        todo.delete()
        return JsonResponse({"todo": model_to_dict(todo)})

    return JsonResponse({"todo": model_to_dict(todo)})
