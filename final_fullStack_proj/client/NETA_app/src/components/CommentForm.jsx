import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";


export default function CommentForm({ reviewId }) {
  //specific id
  const [comment, setComment] = useState(""); // []the state of the comment text field set as empty string.
  const { addComment } = useContext(UserContext); // from UserProviders USercontext Provider area

  function handleCommentChange(e) {
    setComment(e.target.value); //updates the state of the comment text field to the new value
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    addComment(reviewId, { text: comment }); //called from Userprovider and fires adds new comment from the specific reviewId

    setComment("");

  }
  
  
/*{handleCommentSubmit}> { click fires function to set new value }*/
/*{handleCommentChange}  click fires function  adds updated comment*/

  return (
   
    <div>

      <form onSubmit={handleCommentSubmit}> 
        <textarea 
          name="comment"
          value={comment}
          onChange={handleCommentChange} 
          placeholder="Leave a Comment..."
        ></textarea>
        <button title="Comment" className="Comment" type="submit">🗣️</button>
      </form>

    </div>
  );
};

