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
from .utils.test import testMethod  # Import the function
from .utils.natalie import getNataliesOpinion

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

@csrf_exempt  # Disable CSRF for testing purposes (not recommended for production)
def test_view(req):
    if req.method == "POST":
        body = json.loads(req.body)
        print(f"Request: {req}")
        print("--------")
        print(f"The body is: {body}")
        message = body.get("body")  # Get the string from the request body

        # if message is None:
        #     return JsonResponse({"error": "Missing 'message' key in request body"}, status=400)
        message = message.strip()  # Remove leading/trailing whitespace
        message = message[11:]
        print(f"The message is: {message}")
        result = getNataliesOpinion(message)  # Call the function with the string
        # result = testMethod(message)  # Pass the string to testMethod

        return JsonResponse({"result": result})  # Return the result as JSON
    return JsonResponse({"error": "Invalid request method"}, status=400)



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

# Todos stuff here stuff here -----

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

from django.http import JsonResponse
from .utils.test import testMethod  # Import the function


@login_required
def todo(req, id):
    if req.method == "PUT":
        time.sleep(3)
        # notavariable.doThing()
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
