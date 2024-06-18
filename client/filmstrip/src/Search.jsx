import React, { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import Panel from "./Panel";
import SeriesPanel from "./SeriesPanel";
import Loading from "./Loading";
import axios from "axios";

const Search = () => {
  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState(() => {
    const search = window.localStorage.getItem("search");
    return search || ''
  });
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [loading, setLoading] = useState(false);

  const searchFunction = (search) => {
    setLoading(true);
    axios.post(`/api/search`, { search })
      .then(response => {
        setResults(response.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const search = window.localStorage.getItem("search");
    if (search) {
      searchFunction(search);
    }
  }, []);

  const handleSearchInputChange = e => {
    setSearchInput(e.target.value);
  };

  const handleButtonClick = () => {
    if (searchInput !== '') {
      setIsInputEmpty(true);
      window.localStorage.setItem("search", searchInput);
      searchFunction(searchInput);
    } else {
      setIsInputEmpty(false);
    }
  };

  return (
    <div id="home" className="w-full h-full overflow-x-hidden">
      <Navbar />
      <h1 className="text-[#ffd500] text-center text-[4rem] mt-12">SEARCH FOR MOVIES AND SERIES</h1>

      <div className="mx-auto px-8 mt-12">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Movies and series..." required value={searchInput} onChange={handleSearchInputChange} />
          <button id="searchButton" type="button" className="text-[#18191A] absolute end-2.5 bottom-2.5 bg-[#ffd500] hover:bg-[#997f00] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#ffd500] dark:hover:bg-[#997f00] dark:focus:ring-blue-800" onClick={handleButtonClick}>Search</button>
        </div>
        {isInputEmpty ? <></> : <p className="text-red-600 text-center mt-6">You must enter data first!</p>}
      </div>

      {loading ? ( // Renderowanie Loading jeśli dane są ładowane
        <Loading />
      ) : (
        <div id="trendingMovies" className="sm:grid grid-cols-4 w-full p-12 gap-2">
          {results && results.map((result, index) => (
            result.media_type === "movie" ? (
              <Panel key={index} movie={result} index={index} />
            ) : (
              result.media_type === "tv" ? (
                <SeriesPanel key={index} series={result} index={index} />
              ) : (
                <></>
              )
            )
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Search;
