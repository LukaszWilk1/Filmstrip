const Panel = prop => {

    const imgSrc = 'https://image.tmdb.org/t/p/original/';

    return(
        <div id={prop.movie.id} className="">
            <img src={imgSrc + prop.movie.poster_path} alt={prop.movie.title} className="w-full"/>
        </div>
    )
};

export default Panel;