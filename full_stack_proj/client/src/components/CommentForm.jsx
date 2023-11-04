import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";


export default function CommentForm ({ issueId }) {
  const [comment, setComment] = useState("");
  const {addComment} = useContext(UserContext)

  function handleCommentChange(e){
    setComment(e.target.value);
  };

  function handleCommentSubmit(e){
    e.preventDefault();
    addComment(issueId, {text: comment })
    
    setComment("");
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          name="comment"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Leave a Comment..."
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

