import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import EditForm from "./EditForm";
// import "bootstrap/dist/css/bootstrap.min.css";



export default function Issue(props) {
  const { title, description, imgUrl, _id, upvotes, downvotes, issueData } =
    props; // Destructured properties from the props

  const { upVote, downVote, deleteIssue, editIssue } = useContext(UserContext); // Access functions from the UserContext "Cookie Jar" using useContext

  
  const [issueComments, setIssueComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  
  function handleEditClick() {
    setIsEditing(true); // set to true
  }

  
  function handleDeleteClick() {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      // Call the deleteIssue function from UserProvider with the issue ID
      deleteIssue(_id); // 
    }
  }

  
  function handleSaveClick(updatedIssue) {
    // Call the editIssue function with the issue ID and updated data
    editIssue(_id, updatedIssue);
    // Exit edit mode
    setIsEditing(false); //collapses edit form back to normal
  }

  // $(function () {
  //   $(".example-popover").popover({
  //     container: "body",
  //   });
  // });

  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  return (
    <div className="issue_infos">
      {isEditing ? (
        // Render the edit form when isEditing is true
        <EditForm issueData={issueData} save={handleSaveClick} />
      ) : (
        // Else render the issue details and comment section when `isEditing` is `false`

        <>
         

          <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" src={imgUrl} alt="profile"/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>

              <div
                class="btn-group btn-group-sm"
                role="group"
                aria-label="Basic example"
              >
                <button
                  onClick={() => upVote(_id)}
                  type="button"
                  class="btn btn-secondary"
                  title="Like"
                >
                  {" "}
                  {upvotes ? upvotes.length : 0}
                  👍🏽
                </button>

                <button
                  onClick={() => downVote(_id)}
                  type="button"
                  class="btn btn-secondary"
                  title="DisLike"

                >
                  {" "}
                  {downvotes ? downvotes.length : 0}
                  👎🏽
                </button>
              </div>

              <div className="leaveComment">
                <CommentForm issueId={issueData._id} />
                <CommentList
                  issueId={issueData._id}
                  setIssueComments={setIssueComments}
                />
              </div>

             <div
                className=""
                class="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  onClick={() => handleEditClick()}
                  type="button"
                  class="btn btn-secondary"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteClick()}
                  type="button"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
