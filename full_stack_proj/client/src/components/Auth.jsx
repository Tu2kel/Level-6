import React, { useState, useContext } from "react";
import AuthForm from "./AuthForm";
import { UserContext } from "../context/UserProvider";


const initInputs = { username: "", password: "" }; // Initialize an object for form inputs

export default function Auth() {
  const [inputs, setInputs] = useState(initInputs); // Creates state for form inputs
  const [toggle, setToggle] = useState(false); // Create a state for toggling between sign-up and login forms

  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext); // Get functions and state from the UserContext

  function handleChange(e) {
    //updates the inputs state when a change event occurs in the form inputs.
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  //Signup
  function handleSignup(e) {
    e.preventDefault();
    signup(inputs); //from UserProvider 
  }

  // Login
  function handleLogin(e) {
    e.preventDefault();
    login(inputs);
  }

  function toggleForm() {
    setToggle((prev) => !prev); // toggle between sign-up and login forms
    resetAuthErr(); // to reset form / authentication errors
  }

  return (
    <div className="auth_container">
      {/* <h1>Welcome </h1> */}

      <p style={{ color: "red" }}>{errMsg}</p>

      {!toggle ? ( // Conditionally render the sign-up form if 'toggle' is false
        <>
          <h1>WELCOME </h1>
          <h1>SignUp </h1>
          <h2>Rock The Vote!</h2>
          <AuthForm
            handleChange={handleChange} //
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}
          />
          <p id="join" onClick={() => toggleForm()}>
            Already a member?
          </p>
        </>
      ) : (
        // else render the login form if 'toggle' is true
        <>
          <h1>🫡WELCOME BACK😀</h1>
          <h1>Login</h1>
          <AuthForm
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
          />
          <p id="login" onClick={() => toggleForm()}>
            Not a member?
          </p>
        </>
      )}
    </div>
  );
}


