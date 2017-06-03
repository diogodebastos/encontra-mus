from flask import render_template, jsonify, request
from app import app, db
from .models import Room, User

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html',
    	title='Encontra-')

@app.route('/room/<qrcode>/create')
def create(qrcode):
	room = Room.query.filter_by(qrcode=qrcode).first()
	if room is None:
		r = Room(qrcode=qrcode)
		db.session.add(r)
		db.session.commit()
		print('Room %s created') % qrcode
		return 'Room %s created' % qrcode
	else:
		return 'Room already exists'


@app.route('/room/<qrcode>/join/<username>')
def join(qrcode, username):
	room = Room.query.filter_by(qrcode=qrcode).first()
	user = User.query.filter_by(username=username).first()
	if user == None:
		user = User(username = username)
		db.session.add(user)
		db.session.commit()
		return '%s joined %s' % (username, qrcode)
	else:
		return 'Choose another username'

@app.route('/room/<qrcode>/refresh/<username>/<lat>/<lng>')
def refresh(qrcode, username, lat, lng):
	room = Room.query.filter_by(qrcode=qrcode).first()
	user = User.query.filter_by(username=username).first()
	if user != None:
		db.session.delete(user)
		user = User(username = username,
			lat = lat,
			lng = lng,
			author = room)
		db.session.add(user) 
		db.session.commit()
		return '%s refreshed' % (username)
	else:
		return 'ERROR'

@app.route('/room/<qrcode>/get', methods=['GET'])
def get(qrcode):
	room = Room.query.filter_by(qrcode=qrcode).first()
	users = room.users
	users_json = []
	i = 0
	for u in users:
		users_json = users_json + [{
		#'id' : u.id,
		'username' : u.username,
		'lat' : u.lat,
		'lng' : u.lng
		}]
		print users_json[i]
		i = i+1  

	return jsonify({'users_json': users_json})
