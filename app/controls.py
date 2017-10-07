def add_person(db, user):
    db.Users.insert(user.data)
    
def get_person(db):
    return db.Users.find_one()
