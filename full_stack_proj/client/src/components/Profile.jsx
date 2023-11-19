import React, { useContext, useEffect } from "react";
import IssueForm from "./IssueForm"; 
import IssueList from "./IssueList";
import { UserContext } from "../context/UserProvider";
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Profile() {
  const { //grab from UserContext in UserProvider
    user: { username },
    addIssue,
    issues,
    getUserIssues
   
  } = useContext(UserContext);

  
  useEffect(() => {// Saves issues to localStorage whenever they change
    getUserIssues();
  }, []);
  
  // console.log("in Profile line 21", 'Name:', username, 'Issue:', issues);
  
  // console.log('Profile comp, issues:', issues)
  return (
    <>
    <div className="profileWrap" >
      <div className="profile">
        <h1 className="profileTitle">Welcome {username}!</h1>
        <h3 className="h3_Issue">Add An Issue to Vote on below</h3>
        <IssueForm addIssue={addIssue} />{" "}
        {/*renders the IssueForm component and pass the addIssue function as a prop*/}
      <div className="issueBelowGrid">
        <h3 className="issuesBelow">Your Issue(s) Posted Below</h3>
      </div>
        <IssueList issues={issues} />{" "}
        {/* renders the IssueList component and pass the user's issues as a prop. */}
      </div>
      </div>
    </>
  );
}

