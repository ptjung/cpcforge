from django.shortcuts import render
from django.http import HttpResponse
from pymongo import MongoClient

client = MongoClient()
db = client['db_name']

# Create your views here.
def main(req):
    return HttpResponse("Hello")