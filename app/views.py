from app import app

@app.route("/")
@app.route("/index")
def index():
	return "Please download BriefMeet from the app store."

@app.route("/NewUser", methods = ["POST"])
def new_user():
	pass

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