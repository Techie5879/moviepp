import React from 'react'
import './movies.css'

const  Movies = ({movie, synopsis}) => {
    // console.log(movie);
    return (
        <>
            <div>{movie}</div>
            
            <div><p>{synopsis}</p></div>
        </>
    )
}

export default Movies