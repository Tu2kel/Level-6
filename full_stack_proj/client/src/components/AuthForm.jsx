import React from "react";

export default function AuthForm(props) {
  const {
    handleChange, //value of an input field changes
    handleSubmit, //when the form is submitted
    btnText, 
    errMsg, //displays upon err
    inputs: { username, password }, // from Auth.jsx
  } = props;

  return ( //returns a form
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleChange} 
        placeholder="Username"
      />
      <input
        type="text"
        value={password}
        name="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <button>{btnText}</button>
      <p style={{ color: "red" }}> { errMsg } </p>
    </form>
  );
}
