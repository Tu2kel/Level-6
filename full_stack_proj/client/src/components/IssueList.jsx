import React from "react";
import Issue from "./Issue";

export default function IssueList(props) {
  const { issues } = props;
  console.log('issueList issues:',issues)
  return (
    <div className="issue_list">
      
      {
      
      issues?.map((issue) => (
        
        <Issue
          key={issue._id}
          {...issue}
          issueData={issue}
        />
      ))}
    </div>
  );
}
