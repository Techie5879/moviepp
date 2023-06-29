MOVIE++ 
===

Getting recommendations for movies is hard. There's just so much to choose from once you open up IMDb!

So I present my (first!) project, MOVIE++, a movie recommender system using Singular Value Decomposition Matrix Factorization Algorithms and item-based Collaborative Filtering.  
It takes a movie name as user input through the form, and spits out 15 recommended movies based on my Machine Learning model.

## Live Demo:
Deployed at: [MOVIE++](https://techie5879.github.io/moviepp/) (Using Github Pages)  
The deployed verion uses an SVD model item-based CF recommender system (same as the one detailed in the main code), but it has been trained on a smaller dataset to reduce model file size for deployment. It has been trained using the smaller 100K MovieLens small-latest dataset [MovieLens Small-Latest Permalink](https://grouplens.org/datasets/movielens/latest/). It won't provide the same recommendations as the model trained using the 25M Dataset does, but I've tuned the hyperparameters to give recommendations that seem good enough.

## Technologies Used:

### Frontend:
- ReactJS
- CSS

### Backend:
- Flask API

### Model Training:
- Surprise (Python Library)
- Scikit-learn (Python Library)

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

### Error Page (for movie not found):
---
![error page](/images/apology.png?raw=true "apology")



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

### Here's a diagram describing the Data Flow:
![Data flow](/images/flow_data.png?raw=true "Flow of Data")

## For running on localhost:
- To get this project up and running on your localhost, you need to have NodeJS installed. Also the requirements from `requirements.txt` must be installed in the environment you're working on. The movielens dataset must be downloaded too and movies.csv, links.csv and ratings.csv are to be placed in the project directory.  
- Then `cd` into the repo directory, and use the `svd_train.ipynb` to generate the model.  
- Then use `npm start` to start the frontend, and `flask run` to get the backend running

## Challenges Faced and Things Learned: 
Since this was my first ML project (and first project in general), getting to this point was quite a challenge. First, I had to learn about how recommender systems worked, types of recommender systems (like Content-based, Collaborative Filtering). It was a continuous process of googling, finding something new, and trying to learn how to implement that! Then I came across the Netflix Prize ([More about Netflix Challenge here](https://en.wikipedia.org/wiki/Netflix_Prize) and [here](https://datajobs.com/data-science-repo/Recommender-Systems-[Netflix].pdf)), where a modification of a certain technique called SVD which was quite a bit more efficient than other models grabbed the prize. So naturally I was drawn to learn what it is, and how to implement it. I finally settled on a SVD and item-based Collaborative Filtering model to recommend movies.

Then, the next step was training the model, and there was trouble here too. Although the RMSE error was very respectable, the recommendations didnt look that relevant - there was obscure noise in the data. I used a very primitive method and removed some of the noise by leaving out some obscure movies and their ratings while training. This can probably be improved further to reduce the noise more efficiently. This resulted in very relevant recommendations, so I was satisfied.

Next was the frontend. Even though I had some basic HTML, CSS, Javascript knowledge, I didn't really have any experience. So I decided to learn ReactJS instead of just using HTML Templates with Jinja syntax. I learned how to create multi-page React Websites, conditional routing, use of hooks, states, and requesting and handling data. I also implemented an autocomplete feature in the form.

Deployment of this app to a hosting service is a bit of a difficulty as of now, as the model file generated was of 300+ MB. Hosting such a large model online to get predictions along with a Flask server is quite a problem.  
The project has been deployed by making the model smaller by training it on the movielens-small-latest dataset. 
