import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import './form.css'


const Form = () => {
  const [title, setTitle] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  
  // const [text, setText] = useState("")
  const [suggestions, setSuggestions] = useState([])

  // Handling of submission of form
  const movie_submit = {title};
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    // console.log(movie_submit);

    fetch('/predictor', {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(movie_submit)
    }).then((response) => {
      if (response.status !== 200) {
        navigate("/apology");
        // return {}
      }
      if (response.status === 200) {
        return response.json();
      }
    }).then((data) => {
      // console.log(data);
      title ? (navigate('/predict', { state: { wasFetched: true, resp_data: data} })) : (navigate('/apology'));
      setIsPending(false);
    })

  }

  // Get movies for auto complete try
  const [movies, setmovies] = useState([])
  useEffect(() => {
    const loadUsers = async() => {
      const response = await axios.get("/movies");
      setmovies(Object.values(response.data))
    }
    loadUsers();
  }, [])
  
  // Esacpe the regex string properly
  function regexEscape(str) {
    return str.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
  }
  
  // Autocomplete on escaped regex string, matches returns matched array
  const onChangeHandler = (title) => {
    let matches = []
    if (title.length > 3) {
      matches = movies.filter(movie => {
        let input = "^(?=.*(?!\\B\\w)" + title.split(/\s+/).map(x => regexEscape(x)).join("(?<!\\w\\B))(?=.*(?!\\B\\w)") + "(?<!\\w\\B)).*";
        const regex = new RegExp(`${input}`, "gi");
        return movie.match(regex)
      })
    }
    
    setSuggestions(matches.slice(0, 100));
    setTitle(title);
  }
  
  const onSuggestHandler = (title) => {
    setTitle(title);
    setSuggestions([]);
  }

  return (
    
    <div className='form_container'>
        <div className='test'>
          <form className='form' onSubmit={handleSubmit}>
              
            <input type='text' placeholder='Movie Name' id="movie" autoFocus
            autoComplete='off' value={title} onChange={(e)=>{ setTitle(e.target.value); onChangeHandler(e.target.value) }}/>
          
            {!isPending && <button className='button'>Recommend!</button>}
            {isPending && <button className='button' disabled>Recommending...</button>}
          </form>
          
          <div className="suggestions">
            {suggestions && suggestions.map((suggestion, i) => 
              <p key={i} onClick={() => onSuggestHandler(suggestion)}>{suggestion}</p>
            )}
          </div>  
        </div>
    </div>

  )
}

export default Form;
