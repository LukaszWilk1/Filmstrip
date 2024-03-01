const Panel = ({ movie, index }) => {
    const imgSrc = 'https://image.tmdb.org/t/p/original/';

    return (
        <div id={movie.id} className="relative">
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-xs">{index + 1}</div>
            <img src={imgSrc + movie.poster_path} alt={movie.title} className="w-full" />
        </div>
    );
};

export default Panel;
