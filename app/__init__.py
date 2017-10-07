from flask import Flask
app = Flask(__name__)

from app import views
from pymongo import MongoClient


def get_db():
    from pymongo import MongoClient
    DB_NAME = 'briefmeet-demo'
    DB_HOST = 'ds036577.mlab.com'
    DB_PORT = 36577
    DB_USER = 'web'
    DB_PASS = 'B0WLES-G0D$'

    connection = MongoClient(DB_HOST, DB_PORT)
    db = connection[DB_NAME]
    db.authenticate(DB_USER, DB_PASS)
    return db

def add_person(db):
    db.Users.insert({"name" : "check"})
    
def get_person(db):
    return db.Users.find_one()
