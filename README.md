MOVIE++ 
===

Getting Recommendations for movies is hard. There just so much to choose from once you open up IMDb!

So I present my (first!) project, MOVIE++, a movie recommender system using Singular Value Decomposition Matrix Factorization Algorithms and item-based Collaborative Filtering.  
It takes a movie name as user input through the form, and spits out 15 recommended movies based on my Machine Learning model.

## Technologies Used:

### Frontend:
- ReactJS
- CSS

### Backend:
- Flask API

### Model Training:
- Surprise (Python Library)
- SciPy (Python Library)

---

## Screenshots:
### Home page:
![Home page](/images/home.png?raw=true "Home Page")
### Autocomplete suggestions for movies:

![suggestions](/images/suggestions.png?raw=true "Home Page_Suggestions")

### Predictions page for The Dark Knight (2008):
---
![predictions for The Dark Knight (2008)](/images/pred_TDK.png?raw=true "TDK")


### Predictions page for Good Will Hunting (1997):
---
![predictions for Good Will Hunting (1997)](/images/pred_GWH.png?raw=true "GWH")

### How It Works Page:
---
![how it works page](/images/how.png?raw=true "How It Works")

### About Page:
---
![about page](/images/about.png?raw=true "about")


## Usage:

1. User types name of movie, selects a movie from the suggestions list, and clicks the Recommend! button
2. A page with the details of the chosen movie and list of predicted movies with links to their IMDb Pages is displayed. 
3. A user can click on the Poster of any movie to be taken to it's respective IMDb Page

## How It Works: 

The SVD model was first trained using the Surprise Library in Python. The training was done using the MovieLens 25M dataset provided by GroupLens (permalink: [MovieLens 25M dataset](https://grouplens.org/datasets/movielens/25m/))
It contains approximately 25M ratings across 62423 movies.

The Matrix Factorization method of Singular Value Decomposition is a Dimensionality Reduction method which breaks down the user-product preference matrix into a user-feature and item-feature matrix. This reduces the dimension of the user-product preference space.

Then, SciPy vector cosine distance was used to compute similarity of items (movies) by taking the dot product of the latent feature vectors corresponding to each movie. 

The similarity is calculated over all the movies available in the database, and the 15 most similar movies are returned by the Flask API, along with information from the TMDB (The Movie Database) API which has been used to get the poster paths and IMDb IDs of the movies. These are received by the React Frontend and then rendered in the web browser.