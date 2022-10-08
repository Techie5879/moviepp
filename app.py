from flask import Flask, request
from predict import get_recs
import urllib.request

import json

app = Flask(__name__)

obj = {}

imdb_result = {}

@app.route('/')
def index():
    return "Hello World"

@app.route('/movies')
def movies():
    with open("movies_obj.json") as file:
        movies_obj = json.load(file)
    
    movies = movies_obj["title"]
    return movies



@app.route('/predictor', methods=["POST", "GET"])
def predict():

    if request.method == "POST":
        
        movie = request.get_json()
        movie_title = movie["title"]
        # print(movie_title)
        # If movie title isnt empty
        if movie_title:
            predictions = get_recs(movie_title)
            # print(predictions)
            # If movie title in csv list
            if predictions:
                
                final = json.loads(predictions)
                rec_titles = final["imdbId"]
                # print(rec_titles)
                obj.update(rec_titles)
                # print(obj)
            # If movie title isnt in csv list
            else: 
                obj.clear()

    
    # print("OBJECT", obj)
    if obj == {}:
        return None
    else:
        for i in range(6):
            imdbId = (list(obj.values()))[i]
            url = "https://api.themoviedb.org/3/find/tt{}?api_key=3748a98a294946f41071ee122061dc9b&language=en-US&external_source=imdb_id".format(imdbId)
            response = urllib.request.urlopen(url)
            data = response.read()
            intermediate = json.loads(data)
            intermediate["imdbId"] = imdbId
            final = json.dumps(intermediate)
            # print(intermediate)
            imdb_result[i] = json.loads(final)
        return imdb_result



# if __name__ == "__main__":
#     app.run(debug=True)
