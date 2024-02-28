import { useParams } from "react-router-dom"

const Movie = () => {

    const params = useParams();

    return(
        <h1>Movie id: {params.movieId}</h1>
    )
}

export default Movie;