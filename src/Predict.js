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
        // console.log(data);
        
        setMovies(Object.values(data).slice(1, 6));
        setOrg_title(Object.values(data).slice(0, 1));
      })
    } 
    
    else {
      navigate("/apology");
    }

    
  }, [wasFetched, navigate]);

  // useEffect(() => {
  //   if (wasFetched) {
  //     fetch('/predict').then(response => {response.json().then(data => {setMovies(Object.values(data));})})
  //   } 
    
  //   else {
  //     navigate("/apology");
  //   }
  // }, [wasFetched, navigate]);

    
    
  const movie_name = movies.map((movie) => <p key={movie.toString()}>tt{movie}</p>);

  return (
    <div>
        <Navbar />
        <h1>Users who liked tt{org_title} also liked:</h1>
        <br />
        <h2><Movies movie={movie_name}/></h2>
    </div>
  )
}

export default Predict