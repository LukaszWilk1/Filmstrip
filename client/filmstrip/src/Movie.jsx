import { useEffect } from "react";
import { useParams } from "react-router-dom";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjJlMmQ3MWM0MDMyMTMzMDk0YWE4MTNhNzdhZjFhMyIsInN1YiI6IjY1ZDM1MDZlZjQ5NWVlMDE3YzQwNWYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3THJaqU3vl3xsAm4m7VaKGyULMNbsZKrbQzK8z82Hlc'
    }
  };
  
  

const Movie = () => {

    const params = useParams();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }, [])

    return(
        <h1>Movie id: {params.movieId}</h1>
    )
}

export default Movie;