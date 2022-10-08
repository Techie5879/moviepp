import React from 'react'
import './movies.css'

const  Movies = ({movie, overview}) => {
    // console.log(movie);
    return (
        <>
            <div>{movie}</div>
            <br />
            <div>{overview}</div>
        </>
    )
}

export default Movies