class User:
	def __init__(self, name, passhash, description, image=None):
		self.name = name
		self.passhash = passhash
		self.description = description
		self.image = image
		# Other attributes
		self.friends = []
		self.friend_requests = []
			
		def __repr__(self):
			return "User({0}, {1}, {2}, {3})".format(self.name, str(self.passhash), self.description, str(self.image))

		@property
		def data():
			return self.__dict__

class Event:
	def __init__(self, headline, date, users=[]):
		self.headline = headline
		self.date = date
		self.users = users
			
	def __repr__(self):
		return "Event({0}, {1}, {2})".format(self.headline, self.date, self.user)

	@property
	def data():
		return self.__dict__
