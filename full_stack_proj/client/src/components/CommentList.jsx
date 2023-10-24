import React, { useEffect, useState } from "react";
import axios from "axios";

function CommentList({ issueId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments when component mounts
    axios
      .get(`/api/comment/${issueId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [issueId]);

  return (
    <div>
      <h2>Comments</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}

export default CommentList;

/*----------------OLD BELOW-----------*/

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function CommentList({ issueId, setIssueComments }) {
//   const [comments, setComments] = useState([]);

//   const getCommentsForIssue = async () => {
//     try {
//       const response = await axios.get(`/api/comment/${issueId}`);
//       return response.data;
//     } catch (error) {
//       console.error("Err at getCommentsForIssue() ", error)
//       return [];
//     }
//   };

//   useEffect(() => {
//     getCommentsForIssue()
//       .then((issueComments) => {
//         setComments(issueComments);
//         setIssueComments(issueComments); // Passes issue specific comments back to the Issue component
//       })
//       .catch((error) =>
//         console.error("Error updating comments useEffect()", error)
//       );
//   }, [issueId]);

//   return (
//     <div>
//       <h2>Comments</h2>
//       <ul>
//         {comments.map((comment) => (
//           <li key={comment._id}>{comment.text}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CommentList;
