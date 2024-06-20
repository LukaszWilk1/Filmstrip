import { Link } from "react-router-dom";

const Panel = ({ movie, index }) => {
    const imgSrc = 'https://image.tmdb.org/t/p/w500/';
    
    return (
        <Link key={index} to={"/movie/" + movie.id}>
            <div id={movie.id} className="relative mb-2 sm:mb-0">
                {index !== NaN ? <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-xs">
                    {index + 1}
                </div> : <></>}
                    <img src={imgSrc + movie.poster_path} alt={movie.title} className="w-full" />
            </div>
        </Link>
    );
};

export default Panel;
