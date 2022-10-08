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
        console.log(imdb_result_array);

        
        function get_movie_results(movie_obj) {
          return movie_obj["movie_results"][0]["title"];
        }
        const movies_results = imdb_result_array.map(get_movie_results)
        // console.log(movies_results);
        setMovies(movies_results);



        setOverview(Object.values(data[0])[1][0]["overview"])
        
      })
    } 
    
    else {
      navigate("/apology");
    }
    
    
  }, [wasFetched, navigate]);
  

  const movie_name = movies.map((movie) => <p key={movie.toString()}>{movie}<br/><br/></p>);
  // const overview_each = overview.map((movie_overview) => <p key={movie_overview.toString()}>{movie_overview}<br /><br/></p>);

  return (
    <div>
        <Navbar />
        <h1>Users who liked {org_title} also liked:</h1>
        {/* <h2>{org_poster}</h2> */}
        <a href={`https://www.imdb.com/title/tt${org_imdb}/`}><img src={`https://image.tmdb.org/t/p/w400${org_poster}`} alt="org_poster"/></a>
        <br />
        <Movies movie={movie_name} synopsis={overview}/>
    </div>
  )
}

export default Predict