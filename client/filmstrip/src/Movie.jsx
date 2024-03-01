import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjJlMmQ3MWM0MDMyMTMzMDk0YWE4MTNhNzdhZjFhMyIsInN1YiI6IjY1ZDM1MDZlZjQ5NWVlMDE3YzQwNWYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3THJaqU3vl3xsAm4m7VaKGyULMNbsZKrbQzK8z82Hlc'
    }
  };
  
  const imgSrc = 'https://image.tmdb.org/t/p/original/';

const Movie = () => {

    const params = useParams();
    const [movieData, setMovieData] = useState();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US`, options)
            .then(response => response.json())
            .then(response => setMovieData(response))
            .catch(err => console.error(err));
    }, []);

    console.log(movieData);

    return (
        <div>
          <Navbar />
          <div id="movie/series component" className="grid grid-cols-2 py-8">
            <div className="w-full pe-4">
              {movieData && <img src={imgSrc + movieData.poster_path} alt={movieData.title} className="w-[50%] mx-auto" />}
            </div>
            <div className="w-full ml-auto">
              <h1 className="text-[#ffd500] text-[3.5rem]">{movieData && movieData.title}</h1>
            </div>
          </div>
          <Footer />
        </div>
      );
      
}

export default Movie;