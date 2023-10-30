import React, { useContext } from "react";
import CommentList from "./CommentList";
import { UserContext } from "../context/UserProvider";
import Issue from "./Issue";

export default function Public(props) {
  const { publicIssue } = useContext(UserContext);

  return (
    <div className="public">
      <h1>Public Issues</h1>
      <br />
      {publicIssue.map((issue) => (
        <div key={issue._id}>
          <Issue issueData={issue} />
          <CommentList issueId={issue._id} />
        </div>
      ))}
    </div>
  );
}

// import React, { useContext, useEffect, useState } from "react";
// import CommentList from "./CommentList";
// import { UserContext } from "../context/UserProvider";
// import Issue from "./Issue";
// import axios from "axios";

// export default function Public(props) {
//   const [issues, setIssues] = useState([]);
//   const { publicIssue, getAllIssues } = useContext(UserContext);

//   // const getAllIssues = async () => {
//   //   try {
//   //     const response = await axios.get("/api/comment");
//   //     console.log('getAllIssues res/data:',response.data)
//   //     setIssues(response.data);
//   //   } catch (error) {
//   //     console.error("😭Error in getAllIssues in Public.jsx", error);
//   //   }
//   // };

//   useEffect(() => {
//     console.log('inside getAll useEffect')
//     getAllIssues();
//   }, []);

//   return (
//     <div className="public">
//       <h1>Public Issues</h1>
//       <br />
//       {publicIssue.map((issue) => (
//         <div key={issue._id}>
//           <Issue issueData={issue} />
//           <CommentList issueId={issue._id} />
//         </div>
//       ))}
//     </div>
//   );
// }
