from bson.objectid import ObjectId
from bson import json_util

def add_user(db, user):
    try:
        db.Users.insert_one(user.data)
    except Exception as e:
        print(e)

def get_user(db, username):
    try:
        return db.Users.find_one({"username": username})
    except Exception as e:
        print(e)

def get_user_by_id(db, user_id):
    try:
        if ObjectId.is_valid(user_id):
            return db.Users.find_one({"_id": ObjectId(user_id)})
    except Exception as e:
        print(e)

def add_contact(db, username, contact_id):
    try:
        db.Users.update_one({"username": username},
                            {"$push": {"contacts": contact_id}})
    except Exception as e:
        print(e)

def add_event(db, event):
    try:
        db.Events.insert_one(event.data)
    except Exception as e:
        print(e)

def get_event(db, event_id):
    try:
        if ObjectId.is_valid(event_id):
            return db.Events.find_one({"_id": ObjectId(event_id)})
    except Exception as e:
        print(e)

def add_event_user(db, event_id, user_id):
    try:
        if ObjectId.is_valid(event_id):
            db.Events.update_one({"_id": ObjectId(event_id)},
                                 {"$push": {"users": user_id}})
    except Exception as e:
        print(e)

def get_event_users(db, event_id):
    event = get_event(db, event_id)
    users = event.get("users")
    return json_util.dumps(users)

def get_events(db, user_id):
    try:
        return json_util.dumps(db.Events.find({"owner": user_id}))
    except Exception as e:
        print(e)
