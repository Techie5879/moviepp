import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import {Navbar} from './components'
import {Movies} from './components'
import './predict.css'

const Predict = () => {
  const [org_title, setOrg_title] = useState("");
  const [movies, setMovies] = useState([]);
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
        console.log(data);
        
        console.log(org_title)
        setMovies(Object.values(data).slice(0, 5));
        setOrg_title(data["org"])
      })
    } 
    
    else {
      navigate("/apology");
    }

    
  }, [wasFetched, navigate, org_title]);

  // useEffect(() => {
  //   if (wasFetched) {
  //     fetch('/predict').then(response => {response.json().then(data => {setMovies(Object.values(data));})})
  //   } 
    
  //   else {
  //     navigate("/apology");
  //   }
  // }, [wasFetched, navigate]);

    
    
  const movie_name = movies.map((movie) => <p key={movie.toString()}>{movie}</p>);

  return (
    <div>
        <Navbar />
        <h1>Users who liked {org_title} also liked:</h1>
        <br />
        <h2><Movies movie={movie_name}/></h2>
    </div>
  )
}

export default Predict