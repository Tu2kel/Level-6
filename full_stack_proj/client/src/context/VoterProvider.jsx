// import axios from "axios";
// import React, { useState } from "react";

// export const VoterContext = React.createContext();

// const useAxios = axios.create();

// export default function VoterProvider(props) {
//   const [voters, setVoters] = useState([]);

//   const [upVoteCount, setUpVoteCount] = useState(0);
//   const [downVoteCount, setDownVoteCount] = useState(0);

//   function upVote(e) {
//     if (downVoteCount === 1) {
//       console.log("Removing downvote");
//       setDownVoteCount(0);
//     }
//     if (upVoteCount === 0) {
//       console.log("Voted For");
//       setUpVoteCount(1);
//     } else {
//       console.log("User has already upvoted");
//     }
//   }

//   function downVote(e) {
//     if (upVoteCount === 1) {
//       console.log("Removing upvote");
//       setUpVoteCount(0);
//     }
//     if (downVoteCount === 0) {
//       console.log("Voted Against");
//       setDownVoteCount(1);
//     } else {
//       console.log("User has already downvoted");
//     }
//   }

//   return (
//     <VoterContext.Provider
//       value={{
//         voters,
//         upVote,
//         downVote,
//       }}
//     >
//       {props.children}
//     </VoterContext.Provider>
//   );
// }
