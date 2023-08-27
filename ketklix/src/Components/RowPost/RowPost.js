import React, { useEffect, useState } from 'react'
import './RowPost.css'
import { API_KEY, imageUrl } from '../../constants/constants'
import axios from '../../axios'
import Youtube  from 'react-youtube'
function RowPost(props) {
const [movies, setMovies] = useState([])
const [urlId,setUrlId] = useState([''])

useEffect(() => {
    axios.get(props.url).then(response=>{
        const num = getRandomInt(0,20)
        setMovies(response.data.results)
    })  
}, [])

const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie = (id)=>{
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
        if(response.data.results.length!==0 ){
            setUrlId(response.data.results[0])
        }else{
            console.log('Array Empty')
        }        
    })

  }

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {movies.map((obj)=>
<img  onClick={()=>handleMovie(obj.id)}  className={props.isSmall?'smallPoster':'poster'} alt='poster' src={`${imageUrl+obj.backdrop_path}`} />
                )}     
                
            </div>
          
          
        { urlId &&  <Youtube opts ={opts} videoId={urlId.key} />}


          
        </div>
    )
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
export default RowPost