import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import Issue from "./Issue";
import axios from "axios";

export default function Public(props) {
  const [allComments, setAllComments] = useState([]);

  // Function to fetch all comments and set them in the allComments state
  const getAllComments = async (e) => {
      try {
      const response = await axios.get("/api/comment");
      setAllComments(response.data);
    } catch (error) {
      console.error("Error getAllComments in Public.jsx", error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <div className="public">
      <h1>Public Issues</h1>
      <br />
      <Issue {...props.issueData} />

      {props.issueData && (
        <CommentList issueId={props.issueData._id} allComments={allComments} />
      )}

    </div>
  );
}

{/* <CommentList 
  issueId={props.issueData._id} allComments={allComments} /> */}
{/* <CommentList
    issueId={props.issueData ? props.issueData._id : null}
      allComments={allComments} */}