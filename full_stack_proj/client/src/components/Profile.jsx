import React, { useContext, useEffect } from "react";
import IssueForm from "./IssueForm"; 
import IssueList from "./IssueList";
// import Issue from "./Issue";
import { UserContext } from "../context/UserProvider";

export default function Profile(props) {
  const {
    user: { username },
    addIssue,
    issues,
    getUserIssues
   
  } = useContext(UserContext);

  // Saves issues to localStorage whenever they change
  useEffect(() => {
    getUserIssues();
  }, []);
  
  // console.log("in Profile line 21", 'Name:', username, 'Issue:', issues);
  
  // console.log('Profile comp, issues:', issues)
  return (
    <div className="profile">
      <h1>Welcome {username}!</h1>
      <h3>Add An Issue</h3>
      <IssueForm addIssue={addIssue} />
      <h3>Your Issue</h3>
      <IssueList issues={issues} />
      
      
    </div>
  );
}

