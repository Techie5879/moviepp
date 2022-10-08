import React from 'react'
import './movies.css'

const  Movies = ({movie, synopsis}) => {
    // console.log(movie);
    return (
        <>
            <div><p>{synopsis}</p></div>
            <div>{movie}</div>
        
        </>
    )
}

export default Movies