import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";

function CommentList({ reviewId }) {
  //`reviewId` prop as an argument / for specific Id
  const { getComment, comments } = useContext(UserContext); //grabs getComment and comments from the UserContext Provider section 

  useEffect(() => {
    //calls the getComment() from UserProvider 
    getComment(); 
  }, []);

  const filteredComments = comments.filter( //saved filter to variable
    (comment) => comment.review === reviewId
  );
  return (
    <div>
      <br />
      <h2 className="h2CommentHere" >View Comments Below</h2>
      <br />
      <br />
      {comments.length > 0 ? (// comments greater than 0 than
        <ul className="unOrdered_list">
          {filteredComments.map((comment) => ( // maps over filteredComments arr
            <li key={comment._id}> {/* renders the li for each comment */}
              <p>{comment.text}</p> {/* Comments displays */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No One has Commented</p>
      )}
    </div>
  );
}

export default CommentList;


