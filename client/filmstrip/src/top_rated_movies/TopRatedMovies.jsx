import React, { useEffect, useState } from "react";
import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";
import Panel from "../panel/Panel";
import Loading from "../loading/Loading";
import axios from "axios";

const TopRatedMovies = () => {
  window.sessionStorage.setItem("search", "");

  const [loading, setLoading] = useState(true);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/movies`)
      .then((response) => {
        setTopRatedMovies(response.data.results);
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
        TOP RATED MOVIES
      </h1>
      {loading ? (
        <Loading />
      ) : (
        <div
          id="topRatedMovies"
          className="sm:grid grid-cols-4 w-full p-12 gap-2"
        >
          {topRatedMovies.map((movie, index) => (
            <Panel key={index} movie={movie} index={index} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default TopRatedMovies;
