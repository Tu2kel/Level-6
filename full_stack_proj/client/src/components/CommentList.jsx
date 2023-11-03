import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserProvider";

function CommentList({ issueId }) {
  const { getComment, comments } =  useContext(UserContext)

  useEffect(() => {
    getComment()
  }, []);
  console.log( "comments?:", comments); // ID does populate
  const filteredComments = comments.filter(comment => comment.issue === issueId )
  return (
    <div>
      <h2>Comments Here</h2>
      {comments.length > 0 ? (
        <ul>
          {filteredComments.map((comment) => (
            <li key={comment._id}>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No One has Commentted</p>
      )}
    </div>
  );
}

export default CommentList;


