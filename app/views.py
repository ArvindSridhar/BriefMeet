from flask import request
from app import app, db, models
from app.controls import *

@app.route("/")
@app.route("/index")
def index():
	return "Please download BriefMeet from the app store."

@app.route("/SignUp", methods = ["POST"])
def sign_up():
	if request.method == "POST":
		json = request.get_json()
		username = json.get("username")
		fullname = json.get("fullname")
		passhash = json.get("passhash")
		description = json.get("description")
		if None not in (username, fullname, passhash, description):
			add_user(db, models.User(username, fullname, passhash, description))
			return "User created"

@app.route("/<username>/CreateEvent", methods = ["POST"])
def create_event(userid):
	if request.method == "POST":
		pass
	return "Could not create event"

@app.route("/Login", methods = ["GET", "POST"])
def login():
	if request.method == "POST":
		json = request.get_json()
		username = json.get("username")
		passhash = json.get("passhash")
		if None not in (username, passhash):
			user = get_user(db, username)
			if user.get("passhash") == passhash:
				return "Logged in"
			else:
				return "Invalid password"

@app.route("/<username>/AddFriend", methods = ["POST"])
def add_friend(username):
	pass

@app.errorhandler(404)
def not_found(error): # Argument is ignored
	return "<h1>404 - Page Not Found</h1>", 404