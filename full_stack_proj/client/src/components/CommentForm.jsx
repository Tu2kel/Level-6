import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserProvider";


const CommentForm = ({ issueId }) => {
  const [comment, setComment] = useState("");
  const {addComment} = useContext(UserContext)

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addComment(issueId, {text: comment })
    // Axios POST request to add a comment for the issue
    // userAxios
    //   .post(`/api/comment/${issueId}`, { text: comment })
    //   .then((response) => {
    //     console.log("Comment added:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error adding comment:", error);
    //   });

    // Clears the comment input field
    setComment("");
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          name="comment"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Leave a comment..."
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
