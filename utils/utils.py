from bcrypt import checkpw, hashpw, gensalt
from django.contrib import messages
from django.conf import settings
from json import dumps, loads

# Utility Functions
pwd_hash = lambda str: hashpw(str.encode('utf-8'), gensalt(10))
pwd_match = lambda str, hashed: checkpw(str.encode('utf-8'), hashed)

# Extracts specified keys from a given object, and maps a function over the key's respective value (function and key corresponds by index)
get_kpvals = lambda obj, keys, fns: {k: (lambda e: e, fns[i])[bool(fns[i])](obj[k]) for i, k in enumerate(keys)}

def compile_json_msg_fields(request, form):
    fields = {key: request.POST[key] for key in form.declared_fields.keys()}
    messages.error(request, dumps(fields), extra_tags=settings.JSON_FIELDS_MESSAGE_TAG)
    messages.error(request, str(form.errors.as_json()), extra_tags=settings.JSON_ERRORS_MESSAGE_TAG)

def extract_json_msg_fields(request):
    result = {}
    msg_storage = messages.get_messages(request)
    for msg_obj in msg_storage:
        if msg_obj.extra_tags == settings.JSON_FIELDS_MESSAGE_TAG:
            result |= {"fields": loads(msg_obj.message)}
        elif msg_obj.extra_tags == settings.JSON_ERRORS_MESSAGE_TAG:
            result |= {"errors": loads(msg_obj.message)}
    return result