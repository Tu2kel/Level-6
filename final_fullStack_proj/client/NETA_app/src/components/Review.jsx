import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import EditForm from "./EditForm";




//Child

export default function Review(props) {
  const { title, description, imgUrl, _id, upvotes, downvotes, reviewData } =
    props; // Destructured properties from the props

  const { upVote, downVote, deleteReview, editReview } =
    useContext(UserContext); // Access functions from the UserContext "Cookie Jar" using useContext

  
  const [reviewComments, setReviewComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  
  function handleEditClick() {
    setIsEditing(true); // set to true
  }

  
  function handleDeleteClick() {
    if (window.confirm("Are you sure you want to delete this review?")) {
      // Call the deletereview function from UserProvider with the review ID
      deleteReview(_id); // 
    }
  }

  
  function handleSaveClick(updatedReview) {
    // Call the editreview function with the review ID and updated data
    editReview(_id, updatedReview);
    // Exit edit mode
    setIsEditing(false); //collapses edit form back to normal
  }

  return (
    <div className="review_info">
      {isEditing ? (
        // Render the edit form when isEditing is true
        <EditForm reviewData={reviewData} save={handleSaveClick} />
      ) : (
        // Else render the review details and comment section when `isEditing` is `false`
        <div className="card_grid">
          <div className="card_shadow">
            <img className="card_img" src={imgUrl} alt={imgUrl}  />

            <h1 title="Title" className="list_title">
              {" "}
              {title}{" "}
            </h1>
            <br />
            <h3 title="Comment" className="card_body">
              {" "}
              {description}{" "}
            </h3>

            <CommentForm reviewId={reviewData._id} />
            <CommentList
              reviewId={reviewData._id}
              setReviewComments={setReviewComments}
            />
            <button
              title="Like"
              onClick={() => upVote(_id)}
              className="voteBtnUp"
            >
              👍🏽
            </button>
            <p id="upvoting"> {upvotes ? upvotes.length : 0} </p>

            <button
              title="Dislike"
              onClick={() => downVote(_id)}
              className="voteBtnDown"
            >
              👎🏽
            </button>
            <p id="downvoting"> {downvotes ? downvotes.length : 0} </p>

            <div className="card_footer">
              <button onClick={() => handleEditClick()} className="edit btn">
                Edit
              </button>

              <button
                onClick={() => handleDeleteClick()}
                className="delete btn btn-outline "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
