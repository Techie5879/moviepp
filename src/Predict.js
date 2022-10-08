import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import {Navbar} from './components'
import {Movies} from './components'
import './predict.css'

const Predict = () => {
  const [org_title, setOrg_title] = useState("");
  const [movies, setMovies] = useState([]);
  const [overview, setOverview] = useState([]);
  

  const navigate = useNavigate();

  const { state } = useLocation();
  const { wasFetched } = state || {};


  useEffect(() => {
    if (wasFetched) {
      fetch('/predict').then((response) => {
        if (response.status !== 200) {
          navigate("/apology");
          setMovies([]);
          return {}
        }
        if (response.status === 200) {
          return response.json();
        }
      }).then((data)=>{
        // console.log(Object.values(data[0])[0][0]["title"]);
        setOrg_title(Object.values(data[0])[0][0]["title"]);



        const imdb_result_array = Object.values(data).slice(1, 6);
        console.log(imdb_result_array);

        
        function get_movie_results(movie_obj) {
          return movie_obj["movie_results"][0]["title"];
        }
        const movies_results = imdb_result_array.map(get_movie_results)
        // console.log(movies_results);
        setMovies(movies_results);


        function get_overview_results(movie_obj) {
          return movie_obj["movie_results"][0]["overview"];
        }

        const overview_results = imdb_result_array.map(get_overview_results)
        setOverview(overview_results)
        
      })
    } 
    
    else {
      navigate("/apology");
    }
    
    
  }, [wasFetched, navigate]);
  

  const movie_name = movies.map((movie) => <p key={movie.toString()}>{movie}<br/><br/></p>);
  const overview_each = overview.map((movie_overview) => <p key={movie_overview.toString()}>{movie_overview}<br /><br/></p>);

  return (
    <div>
        <Navbar />
        <h1>Users who liked {org_title} also liked:</h1>
        <br />
        <Movies movie={movie_name} overview={overview_each}/>
    </div>
  )
}

export default Predict