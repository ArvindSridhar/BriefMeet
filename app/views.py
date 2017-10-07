from app import app, db, models
from app.controls import *

@app.route("/")
@app.route("/index")
def index():
	return "Please download BriefMeet from the app store."

@app.route("/NewUser", methods = ["GET", "POST"])
def new_user():
	add_person(db, models.User("Donald Trump", 1234, "God Emperor"))
	return "User created"

@app.route("/<user_id>/CreateEvent", methods = ["POST"])
def create_event(userid):
	pass

@app.route("/SignUp", methods=["GET", "POST"])
def sign_up():
	pass

@app.route("/Login", methods = ["GET", "POST"])
def login():
	pass

@app.route("/<user_id>/AddFriend", methods = ["POST"])
def add_friend(user_id):
	pass
