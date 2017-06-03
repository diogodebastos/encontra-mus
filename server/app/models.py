from app import db

class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    qrcode = db.Column(db.String(64), index=True, unique=True)
    users = db.relationship('User', backref='author', lazy='dynamic')

    def __repr__(self):
        return '<Room %r>' % (self.qrcode)

class User(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	username = db.Column(db.String(64), index=True, unique=True)
	lat = db.Column(db.Float)
	lng = db.Column(db.Float)
	room_id = db.Column(db.Integer, db.ForeignKey('room.id'))

	def __repr__(self):
		return '<User %r>' % (self.username)