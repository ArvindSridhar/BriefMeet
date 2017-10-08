from flask import request, session
from app import app, db, models
from app.controls import *

@app.route("/")
@app.route("/index")
def index():
	return "Please download BriefMeet from the app store."

@app.route("/signup", methods = ["GET", "POST"])
def sign_up():
	if request.method == "POST":
		json = request.get_json()
		username = json.get("username")
		fullname = json.get("fullname")
		passhash = json.get("passhash")
		description = json.get("description")
		args = [username, fullname, passhash, description]
		if None not in args:
			add_user(db, models.User(*args))
			return "User created"
	return "Could not add user"

@app.route("/users/<user_id>/events/post", methods = ["POST"])
def create_event(user_id):
	if request.method == "POST":
		json = request.get_json()
		headline = json.get("headline")
		date = json.get("date")
		description = json.get("description")
		args = [headline, date, description]
		user = get_user_by_id(db, user_id)
		if None not in args and user is not None:
			#if session.get("user_id") == str(user.get("_id")):
			add_event(db, models.Event(*args, user_id))
			return "Event created"
			#else:
			#	return "Not logged in"
	return "Could not create event"

@app.route("/users/<user_id>/events", methods = ["GET", "POST"])
def pull_events(user_id):
	user = get_user_by_id(db, user_id)
	if user:
		#if session.get("user_id") == str(user.get("_id")):
		return get_events(db, user_id)
		#else:
		#	return "Not logged in"
	return "User not found"

@app.route("/events/<event_id>/users", methods = ["GET", "POST"])
def pull_event_users(event_id):
    event = get_event(db, event_id)
    if event:
        user = get_user_by_id(db, event.get("owner"))
        if user is not None:#and session.get("user_id") == str(user.get("_id")):
            return get_event_users(db, event_id)
        #else:
        #    return "Not logged in"
    return "Event not found"

@app.route("/events/<event_id>/users/post", methods = ["POST"])
def put_event_user(event_id):
	if request.method == "POST":
		json = request.get_json()
		user_id = json.get("user_id")
		event = get_event(db, event_id)
		user = get_user_by_id(db, user_id)
		if event is not None and user is not None:
			#if session.get("user_id") == str(user.get("_id")):
			if user_id not in event.get("users"):
				if user_id != event.get("owner"):
					add_event_user(db, event_id, user_id)
					return "User added to event"
				else:
					return "Can't add owner to event"
			else:
				return "User is already in event"
			#else:
			#	return "Not logged in"
	return "Could not add user to event"

@app.route("/login", methods = ["POST"])
def login():
	if request.method == "POST":
		json = request.get_json()
		username = json.get("username")
		passhash = json.get("passhash")
		if None not in (username, passhash):
			user = get_user(db, username)
			#if user.get("passhash") == passhash:
			session["user_id"] = str(user.get("_id"))
			return "Login successful"
			#else:
			#	return "Invalid password"
	return "Could not login"

@app.route("/logout", methods=["GET", "POST"])
def logout():
	session["user_id"] = None
	return "Logged out"

@app.route("/users/<user_id>/addcontact/<contact_id>", methods = ["GET", "POST"])
def make_contact(user_id, contact_id):
	user = get_user_by_id(db, user_id)
	contact = get_user_by_id(db, contact_id)
	if user is not None and contact is not None:
		#if session.get("user_id") == str(user.get("_id")):
		if contact_id not in user.get("contacts") and contact_id != str(user.get("_id")):
			add_contact(db, user.username, contact_id)
			return "Contact added"
		#else:
		#	return "Not logged in"
	return "Could not add contact"

@app.errorhandler(404)
def not_found(error): # Argument is ignored
	return "<h1>404 - Page Not Found</h1>", 404
