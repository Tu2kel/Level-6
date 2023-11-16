import React, { useState } from "react";

const initInputs = { // initial inputs
  title: "",
  description: "",
  imgUrl: "",
};

export default function IssueForm(props) {
  const [inputs, setInputs] = useState(initInputs);// set state initInput
  const { addIssue } = props; // destructure from props

  function handleChange(e) {
    const { name, value } = e.target; //grabs name, value of changed input
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value, // update + sets new value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addIssue(inputs); //adds new issue
    setInputs(initInputs); // resets the state to original values
  }

  const { title, description, imgUrl } = inputs; //destructured

  return (
    //renders/returns the form
    <form className="issueForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={handleChange}
        placeholder="Image Url"
      />

      <button className="addIssueBtn">Add Issue</button>
    </form>
  );
}
