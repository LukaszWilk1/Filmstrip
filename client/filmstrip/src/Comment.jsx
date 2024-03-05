import { useAuth } from "./auth";
import { useState } from "react";
import axios from "axios";

const Comment = prop => {

    const auth = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isCommentInputEmpty, setIsCommentInputEmpty] = useState(false);
    const [comment, setComment] = useState('');
    

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleDeleteClick = () => {
        axios.delete(`http://localhost:3001/movie/${prop.movieId}`, {params: {commentId: prop.commentId}})
        .then(response => {
            window.location.reload();
          })
          .catch(err => {
            console.log(err);
          });
    }

    const handleCommentInputChange = e => {
        setComment(e.target.value);
    };

    const handleSendCommentClick = () => {
        if(comment!==''){
          setIsCommentInputEmpty(false);
          setComment('');
          axios.put(`http://localhost:3001/movie/${prop.movieId}`, {commentId: prop.commentId, newComment: comment})
            .then(response => {
              window.location.reload();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          setIsCommentInputEmpty(true);
        }
      };

    return (
        <div className="border-b-[1px] border-grey col-span-2">
            {isEditing && prop.login === auth.user.login ? (
                <div className="col-span-2">
                <label htmlFor="yourComment" className="block text-sm font-medium leading-6 text-gray-900">Edit comment</label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input id="commentInput" type="text" name="price" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" placeholder="Your comment" maxLength={255} value={comment} onChange={handleCommentInputChange}></input>
                  {isCommentInputEmpty ? <p className="text-red-600 text-center">You must write comment first!</p> : <></>}
                </div>
                <button className="border border-[#18191A] mt-4 px-6 rounded-md hover:bg-[#18191A] hover:text-white" onClick={handleSendCommentClick}>SEND</button>
              </div>
            ) : (
                <p>
                    <b>{prop.login}</b>: {prop.comment}
                </p>
            )}
            {prop.login === auth.user.login ? (
                <div>
                    <button
                        className="border border-blue-500 rounded-md text-blue-500 px-8 py-0.5 hover:bg-blue-500 hover:text-white my-4 mr-2"
                        onClick={handleEditClick}
                    >
                        Edit
                    </button>
                    <button 
                        className="border border-red-500 text-red-500 rounded-md px-8 py-0.5 hover:bg-red-500 hover:text-white"
                        onClick={handleDeleteClick}
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Comment;