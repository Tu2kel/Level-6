import React from "react";
import Issue from "./Issue";

export default function IssueList(props) {
  const { issues } = props; //destructure issues
  // console.log('issueList issues:',issues)
  return (
    <div className="issue_list">
      
      {
      
      issues?.map((issue) => ( //map over issues arr and renders
        
        <Issue //passes the key and issueData props to the Issue Comp
          key={issue._id} //
          {...issue}
          issueData={issue} //allows issue to display 
        />
      ))}
    </div>
  );
}
