import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";


export default function CommentForm({ reviewId }) {
  //specific id
  const [comment, setComment] = useState(""); // []the state of the comment text field set as empty string.
  const { addComment } = useContext(UserContext); // from UserProviders USercontext Provider area

  const [isExpanded, setIsExpanded] = useState(false); // track textarea visibility

  function handleCommentChange(e) {
    setComment(e.target.value); //updates the state of the comment text field to the new value
  }

  function handleExpand() {
    setIsExpanded(!isExpanded); // toggle textarea visibility
  }

  function handleSubmit(e) {
    e.preventDefault();
    addComment(reviewId, { text: comment }); //called from Userprovider and fires adds new comment from the specific reviewId

    setComment("");
  }

  /*{handleCommentSubmit}> { click fires function to set new value }*/
  /*{handleCommentChange}  click fires function  adds updated comment*/

  return (
  
    <div>
      <button
        title="Add Comment!"
        className="create_comment"
        onClick={() => handleExpand()}
      >
        {isExpanded ? "close" : "🗣📢"}
      </button>

      {isExpanded && (
        <form onSubmit={handleSubmit}>
          <textarea value={comment} onChange={handleCommentChange} />
          <button type="submit">Submit</button>
        </form>
      )}

      
    </div>

    
            
          
  );
};

