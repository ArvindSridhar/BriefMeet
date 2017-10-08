from bson.objectid import ObjectId

def add_user(db, user):
    db.Users.insert(user.data)

def get_user(db, username):
    return db.Users.find_one({"username": username})

def add_event(db, event):
    db.Events.insert(event.data)

def get_event(db, event_id):
    return db.Events.find_one({"_id": ObjectId(event_id)})