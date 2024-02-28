import { useEffect, useState } from "react";
import { useAuth } from "./auth";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjJlMmQ3MWM0MDMyMTMzMDk0YWE4MTNhNzdhZjFhMyIsInN1YiI6IjY1ZDM1MDZlZjQ5NWVlMDE3YzQwNWYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3THJaqU3vl3xsAm4m7VaKGyULMNbsZKrbQzK8z82Hlc'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

const Home = () => {

    const auth = useAuth();

    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        const trendingMoviesList = [];
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => console.log(response))
    .   catch(err => console.error(err));
    }, []);

    return (
        <div id="home" className="w-full h-full">
            <Navbar/>
                <h1 className="text-[#ffd500] text-center text-[4rem]">TRENDING MOVIES</h1>
            <Footer/>
        </div>
    )
}

export default Home;