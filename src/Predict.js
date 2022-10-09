import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import {Navbar} from './components'
import {Movies} from './components'
import './predict.css'

const Predict = () => {
  const [org_title, setOrg_title] = useState("");
  const [movies, setMovies] = useState([]);
  const [overview, setOverview] = useState("");
  const [org_poster, setOrg_poster] = useState("");
  const [org_imdb, setOrg_imdb] = useState("");
  const [imdb_ids, setImdb_ids] = useState([]);
  const [recs_posters, setRecs_posters] = useState([]);



  const navigate = useNavigate();

  const { state } = useLocation();
  const { wasFetched } = state || {};


  useEffect(() => {
    if (wasFetched) {
      fetch('/predictor').then((response) => {
        if (response.status !== 200) {
          navigate("/apology");
          setMovies([]);
          return {}
        }
        if (response.status === 200) {
          return response.json();
        }
      }).then((data)=>{
        setOrg_title(Object.values(data[0])[1][0]["title"]);
        setOrg_imdb(Object.values(data)[0]["imdbId"])
        
        setOrg_poster(Object.values(data[0])[1][0]["poster_path"])

        const imdb_result_array = Object.values(data).slice(1, 6);
        // console.log(imdb_result_array);

        
        // Get movie titles from IMDb
        function get_movie_results(movie_obj) {
          return movie_obj["movie_results"][0]["title"];
        }
        const movies_results = imdb_result_array.map(get_movie_results)
        setMovies(movies_results);
        // console.log(movies)


        // Get IMDb Ids for the recommended movies
        const movie_imdbs = imdb_result_array.map(get_movie_imdbs)

        function get_movie_imdbs (movie_obj) {
          return movie_obj["imdbId"]
        }
        // console.log(movie_imdbs)
        setImdb_ids(movie_imdbs);

        setOverview(Object.values(data[0])[1][0]["overview"])

        function get_recs_images (movie_obj) {
          return movie_obj["movie_results"][0]["poster_path"]
        }
        const recs_images = imdb_result_array.map(get_recs_images)
        setRecs_posters(recs_images)
      })
    } 
    
    else {
      navigate("/apology");
    }
    
    
  }, [wasFetched, navigate]);
  

  // const movie_name = movies.map((movie) => <p key={movie.toString()}>{movie}<br/><br/></p>);
  // const overview_each = overview.map((movie_overview) => <p key={movie_overview.toString()}>{movie_overview}<br /><br/></p>);
  
  return (
    <div>
        <Navbar />
        <h1>Users who liked {org_title} also liked:</h1>
        {/* <h2>{org_poster}</h2> */}
        <a href={`https://www.imdb.com/title/tt${org_imdb}/`}><img src={`https://image.tmdb.org/t/p/w300${org_poster}`} alt="org_poster"/></a>
        <br />
        <Movies synopsis={overview} />
        <a href= {`https://www.imdb.com/title/tt${imdb_ids[0]}/`}><p>{movies[0]}</p></a>
        <a href= {`https://www.imdb.com/title/tt${imdb_ids[1]}/`}><p>{movies[1]}</p></a>
        <a href= {`https://www.imdb.com/title/tt${imdb_ids[2]}/`}><p>{movies[2]}</p></a>
        <a href= {`https://www.imdb.com/title/tt${imdb_ids[3]}/`}><p>{movies[3]}</p></a>
        <a href= {`https://www.imdb.com/title/tt${imdb_ids[4]}/`}><p>{movies[4]}</p></a>
        <img src={`https://image.tmdb.org/t/p/w200${recs_posters[0]}`} alt="rec1" />
        <img src={`https://image.tmdb.org/t/p/w200${recs_posters[1]}`} alt="rec2" />
        <img src={`https://image.tmdb.org/t/p/w200${recs_posters[2]}`} alt="rec3" />
        <img src={`https://image.tmdb.org/t/p/w200${recs_posters[3]}`} alt="rec4" />
        <img src={`https://image.tmdb.org/t/p/w200${recs_posters[4]}`} alt="rec5" />
    </div>
  )
}

export default Predict