import React from 'react'
import {Navbar} from './components'
import './about.css'
const About = () => {
  return (
    <div className='nav_about_container'>
      <Navbar />
      <div className='about_container'>
        <div className='about'>
          <h2>About</h2>
          <p>Aritra Bandyopadhyay</p>
          <div className='institute'>
            <p>Indian Institute of Engineering Science and Technology, Shibpur</p>
            <p>Class of 2025</p>
          </div>
          <div className='github'>
            <a href='https://github.com/Techie5879/movie_recommender'><p>Github Link for this project</p></a>
            <a href='https://github.com/Techie5879'><p>Github Profile of Aritra Bandyopadhyay</p></a>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default About