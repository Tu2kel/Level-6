import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";

export default function Issue(props) {
  const { title, description, imgUrl, _id, upvotes, downvotes } = props
  const { upVote, downVote } = useContext(UserContext)
  
console.log(props);
  const [upVoteCount, setUpVoteCount] = useState(0);
  const [downVoteCount, setDownVoteCount] = useState(0);

  console.log(upVote);

  return (
    <div className="issue_info">
      <h1> {title} </h1>
      <h3> {description} </h3>
      <img src={imgUrl} alt={imgUrl} width={200} />
      
      <button onClick={ () => upVote(_id)} className="voteBtnUp">
        ⬆️ ⬆️
      </button>
      <p> {upvotes.length} </p>
      <button onClick={() =>downVote(_id)} className="voteBtnDown">
        ⬇️ ⬇️
      </button>
      <p> {downvotes.length} </p>

      {/* <button onClick={() => props.deleteIssue(_id)}>Delete</button> */}
    </div>
  );
}
