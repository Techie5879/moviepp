from flask import Flask, request
from predict import get_recs
import json

app = Flask(__name__)

obj = {}

@app.route('/')
def index():
    return "Hello World"

@app.route('/movies')
def movies():
    with open("movies_obj.json") as file:
        movies_obj = json.load(file)
    
    movies = movies_obj["title"]
    return movies



@app.route('/predict', methods=["POST", "GET"])
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
                print(rec_titles)
                obj.update(rec_titles)
                # print(obj)
            # If movie title isnt in csv list
            else: 
                obj.clear()
            
    if obj == {}:
        return None
    else:
        return obj



# if __name__ == "__main__":
#     app.run(debug=True)
