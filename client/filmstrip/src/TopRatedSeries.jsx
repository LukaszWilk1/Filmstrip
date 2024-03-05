import React, { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import SeriesPanel from "./SeriesPanel";
import Loading from "./Loading";
import axios from "axios";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjJlMmQ3MWM0MDMyMTMzMDk0YWE4MTNhNzdhZjFhMyIsInN1YiI6IjY1ZDM1MDZlZjQ5NWVlMDE3YzQwNWYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3THJaqU3vl3xsAm4m7VaKGyULMNbsZKrbQzK8z82Hlc'
    }
  };

const TopRatedSeries = () => {

    window.localStorage.setItem("search", '');

    const [loading, setLoading] = useState(true);
    const [trendingSeries, setTrendingSeries] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:3001/series")
        .then(response => {
            setTrendingSeries(response.data.results)
        })
        .catch(err => console.error(err))
        .finally(() => {
            setLoading(false); // Ustawienie loading na false po załadowaniu danych
        });   
    }, []);

    return (
        <div id="home" className="w-full h-full overflow-x-hidden">
            <Navbar />
            <h1 className="text-[#ffd500] text-center text-[4rem] mt-12">TOP RATED SERIES</h1>
            {loading ? ( // Wyświetlanie Loading jeśli loading jest true
                <Loading />
            ) : (
                <div id="trendingMovies" className="sm:grid grid-cols-4 w-full p-12 gap-2">
                    {trendingSeries.map((series, index) => (
                        <SeriesPanel key={index} series={series} index={index}/>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
}

export default TopRatedSeries;
