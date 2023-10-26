import React, { useContext, useEffect, useState } from "react";
import CommentList from "./CommentList";
import { UserContext } from "../context/UserProvider";
import Issue from "./Issue";
import axios from "axios";

export default function Public(props) {
  const [issues, setIssues] = useState([]);
  const { publicIssue } = useContext(UserContext);

  const getAllIssues = async () => {
    try {
      const response = await axios.get("/api/issue/user");
      setIssues(response.data);
    } catch (error) {
      console.error("😭Error in getAllIssues in Public.jsx", error);
    }
  };

  useEffect(() => {
    getAllIssues();
  }, []);

  return (
    <div className="public">
      <h1>Public Issues</h1>
      <br />
      {issues.map((issue) => (
        <div key={issue._id}>
          <Issue issueData={issue} />
          <CommentList issueId={issue._id} />
        </div>
      ))}
    </div>
  );
}
