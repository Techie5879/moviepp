from scipy.spatial.distance import cosine as cosine_distance
import pickle, gzip, pickletools
import numpy as np
import pandas as pd
import json


movies = pd.read_csv("movies.csv")
links = pd.read_csv('links.csv', dtype = {"imdbId":str})

df = movies.merge(links, on=["movieId"])
df.drop(["genres","tmdbId"], axis=1)




filepath = "svd_model_200.h5"
with gzip.open(filepath, 'rb') as f:
    p = pickle.Unpickler(f)
    model = p.load()

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
        liked_movie_raw_id = df[df['title']==liked_movie_title]["movieId"].item()
        # Get the first movie vector
        movie_vector: np.array = get_vector_by_movie_title(liked_movie_raw_id, model)
        similarity_table = []
        
        # Iterate over every possible movie and calculate similarity
        for other_movie_raw_id in model.trainset._raw2inner_id_items.keys():
            other_movie_vector = get_vector_by_movie_title(other_movie_raw_id, model)
            
            # Get the second movie vector, and calculate distance
            similarity_score = cosine_distance(other_movie_vector, movie_vector)
            recommended_movies = df[df['movieId']==other_movie_raw_id]["imdbId"].item()
            
            similarity_table.append((similarity_score, recommended_movies))
        recs = pd.DataFrame(sorted(similarity_table), columns=["vector cosine distance", "imdbId"])
        # sort movies by ascending similarity
        recs = recs.head(16).to_json()
        return recs
    # Exception for if there isnt enough info about the movie
    except:
        return None


