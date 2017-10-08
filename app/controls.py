from bson.objectid import ObjectId

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
        return db.Events.find_one({"_id": ObjectId(event_id)})
    except Exception as e:
        print(e)
