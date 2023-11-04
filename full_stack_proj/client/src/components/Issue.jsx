import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import EditForm from "./EditForm";

export default function Issue(props) {
  const { title, description, imgUrl, _id, upvotes, downvotes, issueData } =
    props;

  const { upVote, downVote, deleteIssue, editIssue } = useContext(UserContext);

  const [issueComments, setIssueComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle the "Edit" button click
  function handleEditClick() {
    setIsEditing(true);
  }

  // Function to handle the "Delete" button click
  function handleDeleteClick() {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      // Call the deleteIssue function with the issue ID
      deleteIssue(_id);
    }
  }

  // Function to handle saving the edited issue
  function handleSaveClick(updatedIssue) {
    // Call the editIssue function with the issue ID and updated data
    editIssue(_id, updatedIssue);
    // Exit edit mode
    setIsEditing(false);
  }

  return (
    <div className="issue_info">
      {isEditing ? (
        // Render the edit form when isEditing is true
        <EditForm issueData={issueData} save={handleSaveClick} />
      ) : (
        <>
          <h1> {title} </h1>
          <h3> {description} </h3>
          <img src={imgUrl} alt={imgUrl} width={200} />

          <CommentForm issueId={issueData._id} />
          <CommentList
            issueId={issueData._id}
            setIssueComments={setIssueComments}
          />

          <button onClick={() => upVote(_id)} className="voteBtnUp">
            ⬆️ ⬆️
          </button>
          <p id="upvoting"> {upvotes ? upvotes.length : 0} </p>

          <button onClick={() => downVote(_id)} className="voteBtnDown">
            ⬇️ ⬇️
          </button>
          <p id="downvoting" > {downvotes ? downvotes.length : 0} </p>

          <button onClick={() => handleEditClick()} className="edit">
            Edit
          </button>

          <button onClick={() => handleDeleteClick()} className="delete">
            Delete
          </button>
        </>
      )}
    </div>
  );
}
