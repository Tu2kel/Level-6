import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function Issue(props) {
  const { title, description, imgUrl, _id, upvotes, downvotes, issueData } = props
  console.log('🟡 issueData ', issueData)
  // console.log('comment list - issue id:', fish._id, 'props:', props)

  const { upVote, downVote } = useContext(UserContext)
  const [issueComments, setIssueComments] = useState([]);

  
    // console.log(props);
    // console.log(upVote);

  return (
    <div className="issue_info">
      <h1> {title} </h1>
      <h3> {description} </h3>
      <img src={imgUrl} alt={imgUrl} width={200} />

      <CommentForm issueId={issueData._id} />
      <CommentList issueId={issueData._id} setIssueComments={setIssueComments} />

      <button onClick={() => upVote(_id)} className="voteBtnUp">
        ⬆️ ⬆️
      </button>
              {/* <p> {upvotes.length} </p> */}
      <p> {upvotes ? upvotes.length : 0} </p>

      <button onClick={() => downVote(_id)} className="voteBtnDown">
        ⬇️ ⬇️
      </button>
      <p> {downvotes ? downvotes.length : 0} </p>
              {/* <p> {downvotes.length} </p> */}

      {/* <button onClick={() => props.deleteIssue(_id)}>Delete</button> */}
      
    </div>




  )

}
