import os
from flask import Flask
import os
import datetime
import pymongo
from pymongo import MongoClient

MONGO_URL = os.environ.get('MONGOHQ_URL')

app = Flask(__name__)

@app.route('/')
def hello():
	return MONGO_URL or 'no env'

if __name__ == '__main__':
    app.run(debug=True)