import os
from dotenv import load_dotenv
from flask import Flask, request
from predict import get_recs
import urllib.request

import json
load_dotenv()

API_KEY = os.getenv("API_KEY")

app = Flask(__name__)

obj = {}

imdb_result = {}


@app.route('/movies')
def movies():
    with open("movies_obj.json") as file:
        movies_obj = json.load(file)
    
    movies = movies_obj["title"]
    return movies



@app.route('/predictor', methods=["POST"])
def predict():

    if request.method == "POST":
        
        movie = request.get_json()
        movie_title = movie["title"]
        # If movie title isnt empty
        if movie_title:
            predictions = get_recs(movie_title)
            # If movie title in csv list
            if predictions:
                
                final = json.loads(predictions)
                rec_titles = final["imdbId"]
                obj.update(rec_titles)

                # If movie title isnt in csv list
                for i in range(16):
                    imdbId = (list(obj.values()))[i]
                    url = "https://api.themoviedb.org/3/find/tt{}?api_key={}&language=en-US&external_source=imdb_id".format(imdbId, API_KEY)
                    response = urllib.request.urlopen(url)
                    data = response.read()
                    intermediate = json.loads(data)
                    intermediate["imdbId"] = imdbId
                    final = json.dumps(intermediate)
                    imdb_result[i] = json.loads(final)
                
                return imdb_result
            else: 
                
                return None

