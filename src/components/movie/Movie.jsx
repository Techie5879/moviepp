import React from 'react'
import './movie.css'



const Movie = ({movid, title, poster}) => {
  return (
    <div className='rec_each'>
        <a href= {`https://www.imdb.com/title/tt${movid}/`} target="_blank" rel="noreferrer"><img src={`https://image.tmdb.org/t/p/w200${poster}`} alt="rec1" /></a>
        <p>{title}</p>
    </div>
  )
}

export default Movie