import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import axios from "axios";
import { useAuth } from "./auth";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjJlMmQ3MWM0MDMyMTMzMDk0YWE4MTNhNzdhZjFhMyIsInN1YiI6IjY1ZDM1MDZlZjQ5NWVlMDE3YzQwNWYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3THJaqU3vl3xsAm4m7VaKGyULMNbsZKrbQzK8z82Hlc'
    }
  };
  
  const imgSrc = 'https://image.tmdb.org/t/p/original/';

const Movie = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const params = useParams();

    const [movieData, setMovieData] = useState();
    const [isWritingComment, setIsWritingComment] = useState(false);
    const [comment, setComment] = useState('');
    const [isCommentInputEmpty, setIsCommentInputEmpty] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US`, options)
            .then(response => response.json())
            .then(response => setMovieData(response))
            .catch(err => console.error(err));

        axios.get("http://localhost:3001/comments", {params: {movieId: params.movieId}})
        .then(response => {
          setComments(response.data);
        })
        .catch(err => {
          console.log(err.message);
        })
    }, []);

    const handleAddCommentClick = () =>{
      setIsWritingComment(!isWritingComment);
    }

    const handleCommentInputChange = e => {
      setComment(e.target.value);
    }

    const handleSendCommentClick = () => {
      if(comment!==''){
        setIsCommentInputEmpty(false);
        setComment('');
        axios.post('http://localhost:3001/comments', {params: {userId: auth.user.id, movieId: params.movieId, comment: comment}})
          .then(response => {
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        setIsCommentInputEmpty(true);
      }
    }

    return (
        <div>
          <Navbar />
          <div id="movie/series component" className="grid grid-cols-3 py-8">
            <div className="pe-4">
              {movieData && <img src={imgSrc + movieData.poster_path} alt={movieData.title} className="w-[75%] mx-auto" />}
            </div>

            {movieData && <div className="col-span-2 mr-auto px-4 w-[50%]">
              <h1 className="text-[#ffd500] text-[3.5rem]">{movieData.title}</h1>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">{movieData.tagline}</p>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">Overviev: {movieData.overview}</p>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">Rating: {movieData.vote_average}</p>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">Genres: {movieData.genres.map((genre, index) => (<span key={index}>{genre.name}{index !== movieData.genres.length - 1 && ", "}</span>))}</p>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">Budget: {movieData.budget}$</p></div>}
            </div>
            <div id="comments" className="bg-white grid grid-cols-2 p-4 lg:pr-8 md:pr-6 sm:pr-4 gap-2">
                <div>
                    <p className="text-[2em]">Comments</p>
                </div>

                <div className="text-end">
                  <button className="text-[2em] w-fit p-3 border border-[#18191A] rounded-full hover:bg-[#18191A] hover:text-white" onClick={handleAddCommentClick}>
                   <svg id="plusIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>

                {isWritingComment ? <div className="col-span-2">
                  <label htmlFor="yourComment" className="block text-sm font-medium leading-6 text-gray-900">Your comment</label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input id="commentInput" type="text" name="price" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" placeholder="Your comment" maxLength={255} value={comment} onChange={handleCommentInputChange}></input>
                    {isCommentInputEmpty ? <p className="text-red-600 text-center">You must write comment first!</p> : <></>}
                  </div>
                  <button className="border border-[#18191A] mt-4 px-6 rounded-md hover:bg-[#18191A] hover:text-white" onClick={handleSendCommentClick}>SEND</button>
                </div> : <></>}

                {comments && comments.map((comment, index) => (<Comment key={index} login={comment.login} comment={comment.comment_text} commentId={comment.comment_id} movieId={params.movieId}></Comment>))}

            </div>
          <Footer />
        </div>
      );
      
}

export default Movie;