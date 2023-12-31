import React, { useState } from "react";

export default function EditForm({ issueData, save }) {
  
  const [editedIssue, setEditedIssue] = useState({
    //initial state of the editedIssue is set to the original issue data
    title:          issueData.title,
    description:    issueData.description,
    imgUrl:         issueData.imgUrl,
    comment:        issueData.comment,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setEditedIssue((prevIssue) => ({
      ...prevIssue,
      [name]: value, //sets a new property on the new state
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    save(editedIssue); // saves new value/ state
    console.log("save", save());
  }

  return (
    <form className="editForm" onSubmit={handleSubmit}>
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
        onChange={handleChange}
        placeholder="Leave a Comment..."
      ></textarea>

      <button type="submit">Save</button>
    </form>
  );
}
