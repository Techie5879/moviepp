import React from 'react'
import './how.css'
import {Navbar} from './components'
const How = () => {
  return (
    <div className='nav_how_container'>
      <Navbar />
      
        <div className='how_container'>
          <div className='how'>
            <h2>How It Works</h2>
            <p>
              The model is based on Singular Value Decomposition (SVD) Matrix Factorization method to generate latent features of movies.
              Collaborative Filtering (CF) is used to generate recommendations based on item-item CF. Similarity is computed and the Flask API endpoint provides the predictions which is rendered by the react application.
            </p>
            <p>
              The Predictions are returned as a respose to a POST request from the form in Home. They are then rendered, and each poster can be clicked to go to its respective IMDb Page to get more details.
            </p>
          </div>
        </div>
    </div>
  )
}

export default How