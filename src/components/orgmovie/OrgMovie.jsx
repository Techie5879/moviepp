import React from 'react'
import './org_movie.css'

const OrgMovie = ({synopsis, org_poster_path, org_imdbId, release_date, org_title}) => {
  return (
    <div className='original'>
      <a href={`https://www.imdb.com/title/tt${org_imdbId}/`} target="_blank" rel='noreferrer'><img src={`https://image.tmdb.org/t/p/w300${org_poster_path}`} alt="org_poster"/></a>
      <div className="original_details">
        <h1>Details for {org_title}:</h1>
        <div className="synopsis">
          <h2>Synopsis: </h2>
          <p>{synopsis}</p>
        </div>
        <p className='rel_date'>Release Date: {release_date}</p>
        <div className='view_more'>
          <a href={`https://www.imdb.com/title/tt${org_imdbId}/`} target="_blank" rel='noreferrer'><p>View more on IMDb</p></a>
        </div>
      </div>
    </div>
        

  )
}

export default OrgMovie