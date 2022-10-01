from pyexpat import model
from flask import Flask, request, render_template
from predict import get_recs


app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/predict')
def predict():
    movie_name = request.args.get("movie")
    predictions = get_recs(movie_name)
    if isinstance(predictions, str):
        return render_template("apology.html")
    else: 
        return render_template("prediction.html", predictions=predictions, already_liked=movie_name)

@app.route('/about')
def about():
    return render_template("about.html")

if __name__ == "__main__":
    app.run(debug=True)

