import React, { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import Panel from "./Panel";
import Loading from "./Loading";
import axios from "axios";

const TopRatedMovies = () => {

    window.localStorage.setItem("search", '');

    const [loading, setLoading] = useState(true);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    useEffect(() => {
        axios.get("/api/movies")
        .then(response => {
            setTopRatedMovies(response.data.results)
        })
        .catch(err => console.error(err))
        .finally(() => {
            setLoading(false); // Ustawienie loading na false po załadowaniu danych
        }); 
    }, []);

    return (
        <div id="home" className="w-full h-full overflow-x-hidden">
            <Navbar />
            <h1 className="text-[#ffd500] text-center text-[4rem] mt-12">TOP RATED MOVIES</h1>
            {loading ? ( // Wyświetlanie Loading jeśli loading jest true
                <Loading />
            ) : (
                <div id="topRatedMovies" className="sm:grid grid-cols-4 w-full p-12 gap-2">
                    {topRatedMovies.map((movie, index) => (
                        <Panel key={index} movie={movie} index={index}/>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
}

export default TopRatedMovies;
