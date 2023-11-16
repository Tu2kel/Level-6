import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";


export default function CommentForm ({ issueId }) {
  //specific id
  const [comment, setComment] = useState(""); // []the state of the comment text field set as empty string.
  const { addComment } = useContext(UserContext); // from UserProviders USercontext Provider area

  function handleCommentChange(e) {
    setComment(e.target.value); //updates the state of the comment text field to the new value
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    addComment(issueId, { text: comment }); //called from Userprovider and fires adds new comment from the specific issueId

    setComment("");
  }

  return (
    <div>
      <form onSubmit={handleCommentSubmit}> {/* click fires function to set new value */}
      <br />
        <textarea
          name="comment"
          value={comment}
          onChange={handleCommentChange} /* click fires function  adds updated comment*/
          placeholder="Leave a Comment..."
        ></textarea>
        <div class="btn-group btn-group-sm" type="submit" role="group" >...
        <button className="btn btn-secondary" title="Submit Comment"> 🗣️📢</button>
        </div>
      </form>
    </div>
  );
};

