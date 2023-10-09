import React from "react";
import Issue from "./Issue.jsx";
import Profile from "./Profile";

export default function IssueList(props) {
  const { issues } = props;

  return (
    <div className="issue_list">
      {issues.map(issue => <Issue {...issue} key={issue._id} />)}
    </div>
  );
}
