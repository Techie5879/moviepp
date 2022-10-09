import React from 'react'
import './org_movie.css'

const OrgMovie = ({synopsis, org_poster_path, org_imdbId, release_date, org_title}) => {
  return (
    <div className='original'>
      <a href={`https://www.imdb.com/title/tt${org_imdbId}/`}><img src={`https://image.tmdb.org/t/p/w300${org_poster_path}`} alt="org_poster"/></a>
      <div className="original_details">
        <h2>Details for {org_title}:</h2>
        <p>{synopsis}</p>
        <p>Release Date: {release_date}</p>
      </div>
        
    </div>
  )
}

export default OrgMovie