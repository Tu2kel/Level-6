import React, { useContext, useEffect } from "react";
import IssueForm from "./IssueForm"; 
import IssueList from "./IssueList";
import { UserContext } from "../context/UserProvider";

export default function Profile(props) {
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
    <div className="profile">
      <br />
      <h1>Welcome {username}!</h1>
      <br />
      <h3>Add An Issue to Vote on below</h3>

      <IssueForm addIssue={addIssue} />{" "}
      {/*renders the IssueForm component and pass the addIssue function as a prop*/}

      <h3>Your Issue</h3>

      <IssueList issues={issues} />{" "}
      {/* renders the IssueList component and pass the user's issues as a prop. */}

    </div>
  );
}

