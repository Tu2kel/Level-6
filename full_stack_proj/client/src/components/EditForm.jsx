import React, { useState } from "react";

export default function EditForm({ issueData, save, handleCommentChange }) {
  
  const [editedIssue, setEditedIssue] = useState({
    title:        issueData.title,
    description:  issueData.description,
    imgUrl:       issueData.imgUrl,
    comment:      issueData.comment,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setEditedIssue((prevIssue) => ({
      ...prevIssue,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    save(editedIssue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={editedIssue.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={editedIssue.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="imgUrl"
        value={editedIssue.imgUrl}
        onChange={handleChange}
      />

      <textarea
        name="comment"
        value={editedIssue.comment}
        onChange={handleCommentChange}
        placeholder="Leave a Comment..."
      ></textarea>

      <button type="submit">Save</button>
    </form>
  );
}
