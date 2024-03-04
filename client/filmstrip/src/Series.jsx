import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import axios from "axios";
import { useAuth } from "./auth";
import SeriesComment from "./SeriesComment";
import { useNavigate } from "react-router-dom";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjJlMmQ3MWM0MDMyMTMzMDk0YWE4MTNhNzdhZjFhMyIsInN1YiI6IjY1ZDM1MDZlZjQ5NWVlMDE3YzQwNWYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3THJaqU3vl3xsAm4m7VaKGyULMNbsZKrbQzK8z82Hlc'
    }
  };
  
  const imgSrc = 'https://image.tmdb.org/t/p/w500/';

const Series = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const params = useParams();

    const [seriesData, setSeriesData] = useState();
    const [isWritingComment, setIsWritingComment] = useState(false);
    const [comment, setComment] = useState('');
    const [isCommentInputEmpty, setIsCommentInputEmpty] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${params.seriesId}?language=en-US`, options)
            .then(response => response.json())
            .then(response => setSeriesData(response))
            .catch(err => console.error(err));

        axios.get("http://localhost:3001/seriesComments", {params: {seriesId: params.seriesId}})
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
        axios.post('http://localhost:3001/seriesComments', {userId: auth.user.id, seriesId: params.seriesId, comment: comment})
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
          <div id="movie/series component" className="md:grid md:grid-cols-3 py-8">
            <div className="">
              {seriesData && <img src={imgSrc + seriesData.poster_path} alt={seriesData.title} className="w-[75%] mx-auto" />}
            </div>

            {seriesData && <div className="col-span-2 mr-auto px-4 md:w-[50%] max-w-[100vw]">
              <h1 className="text-[#ffd500] text-[3.5rem]">{seriesData.name}</h1>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">{seriesData.tagline}</p>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">Overviev: {seriesData.overview}</p>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">Rating: {seriesData.vote_average}</p>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">Genres: {seriesData.genres.map((genre, index) => (<span key={index}>{genre.name}{index !== seriesData.genres.length - 1 && ", "}</span>))}</p>
              <p className="text-white mt-8 border-b-[1px] border-[#ffd500]">Seasons: {seriesData.seasons.length-1}</p></div>}
            </div>
            <div id="comments" className="bg-white grid grid-cols-2 p-4 gap-2">
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

                {comments && comments.map((comment, index) => (<SeriesComment key={index} login={comment.login} comment={comment.comment_text} commentId={comment.comment_id} movieId={params.movieId}></SeriesComment>))}

            </div>
          <Footer />
        </div>
      );
      
}

export default Series;