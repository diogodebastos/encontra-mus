from flask import render_template, jsonify, request
from app import app, db
from .models import Room, User

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html',
    	title='Encontra-')

@app.route('/room/<qrcode>/create', methods=['POST'])
def create(qrcode):
	room = Room.query.filter_by(qrcode=qrcode).first()
	if room is None:
		r = Room(qrcode=qrcode)
		db.session.add(r)
		db.session.commit()
		print('Room %s created') % qrcode
		return jsonify({'Message': 'Room %s created' % qrcode})
	else:
		return jsonify({'Message': 'Room already exists'})


@app.route('/room/<qrcode>/join/<username>', methods=['POST'])
def join(qrcode, username):
	room = Room.query.filter_by(qrcode=qrcode).first()
	user = User.query.filter_by(username=username, room_id=room.id).first()
	print(user)
	if user == None:
		user = User(username=username,
			author = room)
		db.session.add(user)
		db.session.commit()
		return jsonify({'Message': '%s joined room %s' % (username, qrcode)})
	else:
		return jsonify({'Message': 'Choose another username'})

@app.route('/room/<qrcode>/refresh/<username>/<lat>/<lng>', methods=['POST'])
def refresh(qrcode, username, lat, lng):
	room = Room.query.filter_by(qrcode=qrcode).first()
	user = User.query.filter_by(room_id=room.id, username=username).first()
	print('User: %s') %user
	#user = User.query.filter_by(username=username).first()
	if user != None:
		db.session.delete(user)
		user = User(username = username,
			lat = lat,
			lng = lng,
			author = room)
		db.session.add(user) 
		db.session.commit()
		return  jsonify({'Message': '%s was updated' % (username)})
	else:
		return  jsonify({'Message': 'Error updating %s' % (username)})

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

@app.route('/room/<qrcode>/logout/<username>', methods=['POST'])
def logout(qrcode, username):
	room = Room.query.filter_by(qrcode=qrcode).first()
	user = User.query.filter_by(room_id=room.id, username=username).first()
	db.session.delete(user)
	db.session.commit()
	return  jsonify({'Message': '%s was removed' %(username)}) 

@app.route('/room/<qrcode>/destroy', methods=['POST'])
def destroy(qrcode):
	room = Room.query.filter_by(qrcode=qrcode).first()
	users = room.users
	for u in users:
		db.session.delete(u)
	db.session.delete(room)
	db.session.commit()
	return jsonify({'Message': 'Room %s is closed' %qrcode})
