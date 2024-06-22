import { useEffect, useState } from "react";
import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";
import Panel from "../panel/Panel";
import Loading from "../loading/Loading";
import axios from "axios";

const Home = () => {

    window.sessionStorage.setItem("search", '');

    const [loading, setLoading] = useState(true);
    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        axios.get(`/api`)
        .then(response => {
            console.log(response);
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
