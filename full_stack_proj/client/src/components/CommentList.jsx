import React, { useEffect, useState } from "react";
import axios from "axios";

function CommentList({ issueId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Get the JWT token from local storage
    const token = localStorage.getItem("token");

    // Configure Axios to include the token in the headers
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    axiosInstance
      .get(`/api/comment/${issueId}`) // Assuming you want to fetch comments for a specific issue
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log("CommentList UseEffect😭", error);
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function CommentList({ issueId }) {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`/api/comment`) //${issueId}
//       .then((response) => {
//         setComments(response.data);
//       })
//       .catch((error) => {
//         console.log("CommentList UseEffect😭", error);
//       });
//   }, [issueId]);
//   // console.log( "issueID?:", issueId);

//   return (
//     <div>
//       <h2>Comments</h2>
//       {comments.length > 0 ? (
//         <ul>
//           {comments.map((comment) => (
//             <li key={comment._id}>
//               <p>{comment.text}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No comments yet.</p>
//       )}
//     </div>
//   );
// }

// export default CommentList;
