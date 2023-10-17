import React, { useState } from "react";

export default function Issue(props) {
  const { title, description, imgUrl, comment, _id } = props;

  const [upVoteCount, setUpVoteCount] = useState(0);
  const [downVoteCount, setDownVoteCount] = useState(0);

  function upVote(e) {
    if (downVoteCount === 1) {
      console.log("Removing downvote", e);
      setDownVoteCount(0);
    }
    if (upVoteCount === 0) {
      console.log("Voted For", e);
      setUpVoteCount(1);
    } else {
      console.log("User has already upvoted");
    }
  }

  function downVote(e) {
    if (upVoteCount === 1) {
      console.log("Removing upvote", e);
      setUpVoteCount(0);
    }
    if (downVoteCount === 0) {
      console.log("Voted Against", e);
      setDownVoteCount(1);
    } else {
      console.log("User has already downvoted");
    }
  }

  return (
    <div className="issue_info">
      <h1> {title} </h1>
      <h3> {description} </h3>
      <img src={imgUrl} alt={imgUrl} width={200} />
      <div>
        <h4> Comments: </h4>
        <ul>
          {comment.map((c, index) => (
            <li key={index}>{c}</li>
          ))}
        </ul>
      </div>
      <br />
      <button onClick={upVote} className="voteBtnUp">
        ⬆️ ⬆️
      </button>
      <button onClick={downVote} className="voteBtnDown">
        ⬇️ ⬇️
      </button>
      <button onClick={() => props.deleteIssue(_id)}>Delete</button>
    </div>
  );
}
