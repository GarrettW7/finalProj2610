from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
import json
from django.http import JsonResponse
from .utils.natalie import getNataliesOpinion
from .utils.jarvis import getJarvisOpinion

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
        if message is None:
            return JsonResponse({"error": "Missing 'message' key in request body"}, status=400)
        messageForNat = message.split("history")[0].strip()  # Get everything until "history" and remove leading/trailing whitespace
        history = message.split("history", 1)[1].strip() if "history" in message else ""
        print(f"The message is: {messageForNat}")
        result = getNataliesOpinion(messageForNat, history)  # Call the function with the string


        return JsonResponse({"result": result})  # Return the result as JSON
    return JsonResponse({"error": "Invalid request method"}, status=400)

def talkToJarvis(req):
    if req.method == "POST":
        body = json.loads(req.body)
        print(f"Request: {req}")
        print("--------")
        print(f"The body is: {body}")
        message = body.get("body")  # Get the string from the request body
        if message is None:
            return JsonResponse({"error": "Missing 'message' key in request body"}, status=400)
        message = message.strip()  # Remove leading/trailing whitespace
        messageForJarvis = message.split("history")[0].strip()  # Get everything until "history" and remove leading/trailing whitespace
        history = message.split("history", 1)[1].strip() if "history" in message else ""
        print(f"The message is: {messageForJarvis}")
        result = getJarvisOpinion(messageForJarvis, history)  # Call the function with the string


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


