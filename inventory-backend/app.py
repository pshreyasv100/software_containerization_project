#!flask/bin/python
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin       # LOCAL DEV
from flask_sqlalchemy import SQLAlchemy
import os
import json
from dataclasses import dataclass


DB_NAME = os.environ.get('POSTGRES_DB')
DB_HOST = os.environ.get('POSTGRES_HOST')
DB_PORT = os.environ.get('POSTGRES_PORT')
DB_USER = os.environ.get('POSTGRES_USER')
DB_PASS = os.environ.get('POSTGRES_PASSWORD').strip()

DATABASE_URL = f'postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}'


app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


@dataclass
class Movie(db.Model):
    id: int
    title: str
    genre: str

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    genre = db.Column(db.String)
    
    


@app.route("/movies", methods=["GET"])
def all():
    try:
        movies = Movie.query.all()
    except Exception as error:
        return f'Error while executing DB query: {error}'
    return jsonify(movies), 200


@app.route("/movies/add", methods=["POST"])
def add():
    try:
        record = request.get_json()
        title = record["title"]
        genre = record["genre"]

        movie_record = Movie(title=title, genre=genre)
        db.session.add(movie_record)
        db.session.commit()
    except Exception as error:
        return f'Error adding new: {error}'
    return jsonify(movie_record), 201




if __name__ == '__main__':
    app.run(debug=True)