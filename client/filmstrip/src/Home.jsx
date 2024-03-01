import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import Panel from "./Panel";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjJlMmQ3MWM0MDMyMTMzMDk0YWE4MTNhNzdhZjFhMyIsInN1YiI6IjY1ZDM1MDZlZjQ5NWVlMDE3YzQwNWYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3THJaqU3vl3xsAm4m7VaKGyULMNbsZKrbQzK8z82Hlc'
    }
  };

  const Home = () => {

    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
            setTrendingMovies(response.results);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <div id="home" className="w-full h-full overflow-x-hidden">
            <Navbar />
            <h1 className="text-[#ffd500] text-center text-[4rem]">TRENDING MOVIES</h1>
            <div id="trendingMovies" className="grid grid-cols-4 w-full p-12 gap-2">
                {trendingMovies.map((movie, index) => (
                    <Link key={index} to={"/movie/" + movie.id}>
                        <Panel movie={movie} index={index}/>
                    </Link>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Home;
