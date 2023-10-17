import React from "react";
import Issue from "./Issue";

export default function IssueList(props) {
  const { issues } = props;
  return (
    <div className="issue_list">
      {issues.map((issue) => (
        <Issue
        //   key={issue._id}
       
        //   title={issue.title}
        //   description={issue.description}
        //   imgUrl={issue.imgUrl}
        //   comment={issue.comment}
        // />
        
        // <Issue
          key={issue._id}
          {...issue}
          // comment={issue.comment}
        />
      ))}
    </div>
  );
}
