from pyexpat import model
from flask import Flask, request, render_template
import pandas as pd

from scipy.spatial.distance import cosine as cosine_distance
import pickle, gzip, pickletools
import numpy as np
app = Flask(__name__)

filepath = "svd_model_200.h5"
with gzip.open(filepath, 'rb') as f:
    p = pickle.Unpickler(f)
    model = p.load()
movies = pd.read_csv("movies.csv")



def get_vector_by_movie_title(raw_id: int, trained_model=model) -> np.array:
    """Returns the latent features of a movie in the form of a numpy array"""
    movie_row_idx = trained_model.trainset._raw2inner_id_items[raw_id]
    return trained_model.qi[movie_row_idx]

def get_recs(liked_movie_title: str, model=model):
    try:
        """Returns the top 25 most similar movies to a specified movie
        
        This function iterates over every possible movie in MovieLens and calculates
        distance between `movie_title` vector and that movie's vector.
        """
        liked_movie_raw_id = movies[movies['title']==liked_movie_title]["movieId"].item()
        # Get the first movie vector
        movie_vector: np.array = get_vector_by_movie_title(liked_movie_raw_id, model)
        similarity_table = []
        
        # Iterate over every possible movie and calculate similarity
        for other_movie_raw_id in model.trainset._raw2inner_id_items.keys():
            other_movie_vector = get_vector_by_movie_title(other_movie_raw_id, model)
            
            # Get the second movie vector, and calculate distance
            similarity_score = cosine_distance(other_movie_vector, movie_vector)
            recommended_movies = movies[movies['movieId']==other_movie_raw_id]["title"].item()
            if similarity_score != 0:
                similarity_table.append((similarity_score, recommended_movies))
        recs = pd.DataFrame(sorted(similarity_table), columns=["vector cosine distance", "Movie Title"])
        # sort movies by ascending similarity
        recs = list(recs.head(25).to_dict()["Movie Title"].values())
        return recs
    # Exception for if there isnt enough info about the movie
    except:
        return "Not enough info about movie"


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/predict')
def predict():
    predictions = get_recs(request.args.get("movie"))
    if isinstance(predictions, str):
        return render_template("apology.html")
    else: 
        return render_template("prediction.html", predictions=predictions)

if __name__ == "__main__":
    app.run(debug=True)

