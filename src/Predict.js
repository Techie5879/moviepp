import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import {Movie, Navbar} from './components'
import {OrgMovie} from './components'

import './predict.css'

const Predict = () => {
  const [org_title, setOrg_title] = useState("");
  const [movies, setMovies] = useState([]);
  const [overview, setOverview] = useState("");
  const [org_poster, setOrg_poster] = useState("");
  const [org_imdb, setOrg_imdb] = useState("");
  const [imdb_ids, setImdb_ids] = useState([]);
  const [recs_posters, setRecs_posters] = useState([]);
  const [org_release, setOrg_release] = useState("");



  const navigate = useNavigate();

  const { state } = useLocation();
  const { wasFetched, resp_data } = state || {};


  useEffect(() => {
    if (wasFetched && resp_data) {
      console.log(resp_data);
        setOrg_title(Object.values(resp_data[0])[1][0]["title"]);
        setOrg_imdb(Object.values(resp_data)[0]["imdbId"])
        
        setOrg_poster(Object.values(resp_data[0])[1][0]["poster_path"])
        
        const imdb_result_array = Object.values(resp_data).slice(1, 16);

        
        
        // Get movie titles from IMDb
        function get_movie_results(movie_obj) {
          return movie_obj["movie_results"][0]["title"];
        }
        const movies_results = imdb_result_array.map(get_movie_results)
        setMovies(movies_results);
        console.log(movies)
        
        
        // Get IMDb Ids for the recommended movies
        const movie_imdbs = imdb_result_array.map(get_movie_imdbs)
        
        function get_movie_imdbs (movie_obj) {
          return movie_obj["imdbId"]
        }
        console.log(movie_imdbs)
        setImdb_ids(movie_imdbs);
        
        setOverview(Object.values(resp_data[0])[1][0]["overview"])

        function get_recs_images (movie_obj) {
          return movie_obj["movie_results"][0]["poster_path"]
        }
        const recs_images = imdb_result_array.map(get_recs_images)
        setRecs_posters(recs_images)

        console.log(Object.values(resp_data[0])[1][0]["release_date"]);

        // Date conversion from YYYY-MM-DD to DD-MM-YYYY
        function convertDate(dateString){
          var p = dateString.split(/\D/g)
          return [p[2],p[1],p[0] ].join("-")
          }
           
          setOrg_release(convertDate(Object.values(resp_data[0])[1][0]["release_date"]))
    
    } 
    
    else {
      navigate("/apology");
    }
    
    
  }, [wasFetched, navigate, resp_data]);
  
  console.log(resp_data)
  // const movie_name = movies.map((movie) => <p key={movie.toString()}>{movie}<br/><br/></p>);
  // const overview_each = overview.map((movie_overview) => <p key={movie_overview.toString()}>{movie_overview}<br /><br/></p>);
  
  return (
    <div>
        <Navbar />
        
        
        
        <OrgMovie synopsis={overview} org_poster_path={org_poster} org_imdbId = {org_imdb} release_date={org_release} org_title={org_title}/>
        <div className='heading'>
          <h1>Users who liked {org_title} also liked:</h1>
        </div>
        <div className='recs'>

          <Movie movid={imdb_ids[0]} title={movies[0]} poster={recs_posters[0]} />
          <Movie movid={imdb_ids[1]} title={movies[1]} poster={recs_posters[1]} />
          <Movie movid={imdb_ids[2]} title={movies[2]} poster={recs_posters[2]} />
          <Movie movid={imdb_ids[3]} title={movies[3]} poster={recs_posters[3]} />
          <Movie movid={imdb_ids[4]} title={movies[4]} poster={recs_posters[4]} />
          <Movie movid={imdb_ids[5]} title={movies[5]} poster={recs_posters[5]} />
          <Movie movid={imdb_ids[6]} title={movies[6]} poster={recs_posters[6]} />
          <Movie movid={imdb_ids[7]} title={movies[7]} poster={recs_posters[7]} />
          <Movie movid={imdb_ids[8]} title={movies[8]} poster={recs_posters[8]} />
          <Movie movid={imdb_ids[9]} title={movies[9]} poster={recs_posters[9]} />
          <Movie movid={imdb_ids[10]} title={movies[10]} poster={recs_posters[10]} />
          <Movie movid={imdb_ids[11]} title={movies[11]} poster={recs_posters[11]} />
          <Movie movid={imdb_ids[12]} title={movies[12]} poster={recs_posters[12]} />
          <Movie movid={imdb_ids[13]} title={movies[13]} poster={recs_posters[13]} />
          <Movie movid={imdb_ids[14]} title={movies[14]} poster={recs_posters[14]} />

        </div>
        {/* <a href= {`https://www.imdb.com/title/tt${imdb_ids[0]}/`}><p>{movies[0]}</p></a>
        <a href= {`https://www.imdb.com/title/tt${imdb_ids[1]}/`}><p>{movies[1]}</p></a>
        <a href= {`https://www.imdb.com/title/tt${imdb_ids[2]}/`}><p>{movies[2]}</p></a>
        <a href= {`https://www.imdb.com/title/tt${imdb_ids[3]}/`}><p>{movies[3]}</p></a>
        <a href= {`https://www.imdb.com/title/tt${imdb_ids[4]}/`}><p>{movies[4]}</p></a>
        <img src={`https://image.tmdb.org/t/p/w200${recs_posters[0]}`} alt="rec1" />
        <img src={`https://image.tmdb.org/t/p/w200${recs_posters[1]}`} alt="rec2" />
        <img src={`https://image.tmdb.org/t/p/w200${recs_posters[2]}`} alt="rec3" />
        <img src={`https://image.tmdb.org/t/p/w200${recs_posters[3]}`} alt="rec4" />
        <img src={`https://image.tmdb.org/t/p/w200${recs_posters[4]}`} alt="rec5" /> */}
    </div>
  )
}

export default Predict