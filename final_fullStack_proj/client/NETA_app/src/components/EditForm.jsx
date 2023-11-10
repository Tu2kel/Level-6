import React, { useState } from "react";

export default function EditForm({ reviewData, save, handleCommentChange }) {
  
  const [editedReview, setEditedReview] = useState({
    //initial state of the editedreview is set to the original review data
    title:          reviewData.title,
    description:    reviewData.description,
    imgUrl:         reviewData.imgUrl,
    comment:        reviewData.comment,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setEditedReview((prevReview) => ({
      ...prevReview,
      [name]: value, //sets a new property on the new state
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    save(editedReview); // saves new value/ state
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={editedReview.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={editedReview.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="imgUrl"
        value={editedReview.imgUrl}
        onChange={handleChange}
      />

      <textarea
        name="comment"
        value={editedReview.comment}
        onChange={handleCommentChange}
        placeholder="Leave a Comment..."
      ></textarea>

      <button type="submit">Save</button>
    </form>
  );
}
