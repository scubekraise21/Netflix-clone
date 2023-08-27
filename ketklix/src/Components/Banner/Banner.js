import React,{useEffect, useState} from 'react'
import './Banner.css'
import {API_KEY,imageUrl} from '../../constants/constants'
import axios from '../../axios'
function Banner() {
  const [movie, setMovie] = useState()
  useEffect(() => {
    
    axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0])
      const num = getRandomInt(0,20)
      setMovie(response.data.results[num])
    })
  }, [])
  
  return (
    <div style={{backgroundImage:`url(${movie?imageUrl+movie.backdrop_path:""})`}} className='banner' >
   <div className='content'>
    <h1 className='title'>{movie?movie.title:"Empty Title"}</h1>
    <div className='banner_buttons'>
        <button className='button'>Play</button>
        <button className='button'>My List</button>
        
    </div>
    <h1 className='description'>{movie?movie.overview:"Empty Description"}</h1>
   
   </div>

   <div className="fade_bottom"></div>
    </div>
  )

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Banner



