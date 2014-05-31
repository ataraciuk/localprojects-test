import os
from flask import Flask
import os
import datetime
import pymongo
from pymongo import MongoClient
from flask import render_template
from flask import request
from bson.objectid import ObjectId

MONGO_URL = os.environ.get('MONGOHQ_URL')
dbName = 'app25806883'
if(MONGO_URL is None):
	MONGO_URL = 'mongodb://localprojects:localprojects@localhost:27017/localprojects'
	dbName = 'localprojects'

client = MongoClient(MONGO_URL)
db = client[dbName]

app = Flask(__name__)

@app.route('/')
def index():
	return  ', '.join(db.collection_names())

@app.route('/admin/')
def admin():
	return render_template('admin.html')

@app.route('/admin/statistics/')
def statistics():
	elems = db.statistics.find()
	return render_template('statistics.html', elems=elems)

@app.route('/admin/rounds/')
def rounds():
	statistics = db.statistics.find()
	elems = db.rounds.find()
	return render_template('rounds.html', elems=elems, statistics=statistics)

@app.route('/admin/statistics/new/', methods=['POST'])
def newStat():
	name = request.form['name']
	new_id = db.statistics.insert({'name': name})
	return render_template('statistic.html', elem={'name': name, '_id': new_id})

@app.route('/admin/statistics/<stat_id>/update/', methods=['POST'])
def updateStat(stat_id):
	name = request.form['name']
	db.statistics.save({'name':name, '_id': ObjectId(stat_id)})
	return ''

@app.route('/admin/statistics/<stat_id>/delete/', methods=['POST'])
def deleteStat(stat_id):
	db.statistics.remove({'_id': ObjectId(stat_id)})
	return ''

@app.route('/admin/rounds/new/', methods=['POST'])
def newRound():
	name = request.form['question']
	new_id = db.rounds.insert({'question': name, 'inGame': True})
	statistics = db.statistics.find()
	return render_template('round.html', elem={'question': name, '_id': new_id}, statistics=statistics)

if __name__ == '__main__':
    app.run(debug=True)