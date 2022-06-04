from bcrypt import checkpw, hashpw, gensalt

# Utility Functions
pwd_hash = lambda str: hashpw(str.encode('utf-8'), gensalt(10))
pwd_match = lambda str, hashed: checkpw(str.encode('utf-8'), hashed)

# Extracts specified keys from a given object, and maps a function over the key's respective value (function and key corresponds by index)
get_kpvals = lambda obj, keys, fns: {k: (lambda e: e, fns[i])[bool(fns[i])](obj[k]) for i, k in enumerate(keys)}