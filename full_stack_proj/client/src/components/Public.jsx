import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import IssueList from "./IssueList";

export default function Public(props) {
  const { publicIssue, getAllIssues } = useContext(UserContext);

  useEffect( () => {
    getAllIssues() // adding all issues on public page
  }, [])

  return (
    <div className="public">
      <header>
        {" "}
        <strong> Public Issues Below </strong>{" "}
      </header>
      <br />
      <IssueList issues={publicIssue} />{" "}
      {/* render IssueList + pass the publicIssues  */}
    </div>
  );
}

