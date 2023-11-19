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
      {" "}
      
      <>
        <div className="alerts">
          <p>{errMsg}</p>{" "}
        </div>

        {!toggle ? ( // Conditionally render the sign-up form if 'toggle' is false
          <>
            <div className="authHeader">
              {" "}
              {/* get a disp grid */}
              <h1>WELCOME </h1>
              <h2>To </h2>
              <h3>Rock The Vote!</h3>
            </div>

            <AuthForm 
              handleChange={handleChange}
              handleSubmit={handleSignup}
              inputs={inputs}
              btnText="Sign up"
              errMsg={errMsg}
            />
            <p id="join" onClick={() => toggleForm()}>
              Click to Login
            </p>
          </>
        ) : (
          // else render the login form if 'toggle' is true
          <>
            <div className="authHeader">
              <h1>WELCOME BACK🫡</h1>
              <br />
              <h3>Login</h3>
            </div>

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
      </>
    </div>
  );
}


