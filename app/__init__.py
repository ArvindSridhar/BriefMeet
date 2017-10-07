from flask import Flask, jsonify
app = Flask(__name__)

from pymongo import MongoClient


def db_connect():
    DB_NAME = 'briefmeet-demo'
    DB_HOST = 'ds036577.mlab.com'
    DB_PORT = 36577
    DB_USER = 'web'
    DB_PASS = 'B0WLES-G0D$'

    connection = MongoClient(DB_HOST, DB_PORT)
    db = connection[DB_NAME]
    db.authenticate(DB_USER, DB_PASS)
    return db

db = db_connect()
from app import views
