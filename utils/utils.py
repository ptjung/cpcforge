from bcrypt import checkpw, hashpw, gensalt
from django.contrib import messages
from django.conf import settings
from json import loads

# Utility Functions
pwd_hash = lambda str: hashpw(str.encode('utf-8'), gensalt(10))
pwd_match = lambda str, hashed: checkpw(str.encode('utf-8'), hashed)

# Extracts specified keys from a given object, and maps a function over the key's respective value (function and key corresponds by index)
get_kpvals = lambda obj, keys, fns: {k: (lambda e: e, fns[i])[bool(fns[i])](obj[k]) for i, k in enumerate(keys)}

def compile_json_msg_errors(request, form):
    messages.error(request, str(form.errors.as_json()), extra_tags=settings.JSON_ERRORS_MESSAGE_TAG)

def extract_json_msg_errors(request):
    msg_storage = messages.get_messages(request)
    for msg_obj in msg_storage:
        if msg_obj.extra_tags == settings.JSON_ERRORS_MESSAGE_TAG:
            return loads(msg_obj.message)
    return {}