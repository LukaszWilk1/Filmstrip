import { Link } from "react-router-dom";

const SeriesPanel = ({ series, index }) => {
    const imgSrc = 'https://image.tmdb.org/t/p/original/';
    
    return (
        <Link key={index} to={"/series/" + series.id}>
            <div id={series.id} className="relative mb-2 sm:mb-0">
                <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-xs">
                    {index + 1}
                </div>
                    <img src={imgSrc + series.poster_path} alt={series.title} className="w-full" />
            </div>
        </Link>
    );
};

export default SeriesPanel;
