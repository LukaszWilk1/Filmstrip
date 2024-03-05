import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import Panel from "./Panel";
import Loading from "./Loading";
import axios from "axios";

const Home = () => {

    window.localStorage.setItem("search", '');

    const [loading, setLoading] = useState(true);
    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:3001/")
        .then(response => {
            setTrendingMovies(response.data.results)
        })
        .catch(err => console.error(err))
        .finally(() => {
            setLoading(false); // Ustawienie loading na false po załadowaniu danych
        });    
    }, []);

    return (
        <div id="home" className="w-full h-full overflow-x-hidden">
            <Navbar/>
            <h1 className="text-[#ffd500] text-center text-[4rem] mt-12">TRENDING MOVIES</h1>
            {loading ? ( // Wyświetlanie Loading jeśli loading jest true
                <Loading />
            ) : (
                <div id="trendingMovies" className="sm:grid grid-cols-4 w-full p-12 gap-2">
                    {trendingMovies && trendingMovies.map((movie, index) => (
                        <Panel key={index} movie={movie} index={index}/>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Home;
