import React from 'react'
import './org_movie.css'

const OrgMovie = ({synopsis, org_poster_path, org_imdbId}) => {
  return (
    <div className='original'>
      <a href={`https://www.imdb.com/title/tt${org_imdbId}/`}><img src={`https://image.tmdb.org/t/p/w300${org_poster_path}`} alt="org_poster"/></a>
      <div className="original_details">
        <h2>Details</h2>
        <p>{synopsis}</p>
      </div>
        
    </div>
  )
}

export default OrgMovie