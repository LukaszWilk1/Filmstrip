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
          <div id="movie/series component" className="grid grid-cols-3 py-8">
            <div className="pe-4">
              {movieData && <img src={imgSrc + movieData.poster_path} alt={movieData.title} className="w-[75%] mx-auto" />}
            </div>

            {movieData && <div className="col-span-2 mr-auto px-4 w-[50%]">
              <h1 className="text-[#ffd500] text-[3.5rem]">{movieData.title}</h1>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">{movieData.tagline}</p>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">Overviev: {movieData.overview}</p>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">Rating: {movieData.vote_average}</p>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">Genres: {movieData.genres.map((genre, index) => (<span key={index}>{genre.name}{index !== movieData.genres.length - 1 && ", "}</span>))}
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">Budget: {movieData.budget}$</p>
</p>

              
            </div>}
            
          </div>
          <Footer />
        </div>
      );
      
}

export default Movie;