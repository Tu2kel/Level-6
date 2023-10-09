import React, { useContext } from "react";
import IssueForm from "./IssueForm"; // REPLACE
import IssueList from "./IssueList";
import Issue from "./Issue";
import { UserContext } from "../context/UserProvider";

export default function Profile() {
  const {
    user: { username },
    addIssue,
    issues,
  } = useContext(UserContext);
  console.log(issues);
  console.log(username);

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
