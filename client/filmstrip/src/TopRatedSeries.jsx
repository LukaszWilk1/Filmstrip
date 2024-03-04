import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import SeriesPanel from "./SeriesPanel";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjJlMmQ3MWM0MDMyMTMzMDk0YWE4MTNhNzdhZjFhMyIsInN1YiI6IjY1ZDM1MDZlZjQ5NWVlMDE3YzQwNWYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3THJaqU3vl3xsAm4m7VaKGyULMNbsZKrbQzK8z82Hlc'
    }
  };

  const TopRatedSeries = () => {

    const [trendingSeries, setTrendingSeries] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
            setTrendingSeries(response.results);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <div id="home" className="w-full h-full overflow-x-hidden">
            <Navbar />
            <h1 className="text-[#ffd500] text-center text-[4rem] mt-12">TOP RATED SERIES</h1>
            <div id="trendingMovies" className="grid grid-cols-4 w-full p-12 gap-2">
                {trendingSeries.map((series, index) => (
                    <SeriesPanel key={index} series={series} index={index}/>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default TopRatedSeries;
