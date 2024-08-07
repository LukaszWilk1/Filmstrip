import React, { useEffect, useState } from "react";
import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";
import SeriesPanel from "../series_panel/SeriesPanel";
import Loading from "../loading/Loading";
import axios from "axios";

const TopRatedSeries = () => {
  window.sessionStorage.setItem("search", "");

  const [loading, setLoading] = useState(true);
  const [trendingSeries, setTrendingSeries] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/series`)
      .then((response) => {
        setTrendingSeries(response.data.results);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div id="home" className="w-full h-full overflow-x-hidden">
      <Navbar />
      <h1 className="text-[#ffd500] text-center text-[4rem] mt-12">
        TOP RATED SERIES
      </h1>
      {loading ? (
        <Loading />
      ) : (
        <div
          id="trendingMovies"
          className="sm:grid grid-cols-4 w-full p-12 gap-2"
        >
          {trendingSeries.map((series, index) => (
            <SeriesPanel key={index} series={series} index={index} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default TopRatedSeries;
