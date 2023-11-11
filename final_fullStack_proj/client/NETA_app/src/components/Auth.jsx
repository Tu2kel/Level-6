import React, { useState, useContext } from "react";
import AuthForm from "./AuthForm";
import { UserContext } from "../context/UserProvider";

//⁡⁢⁢⁣AUTH SignUp Page is Home Page⁡

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
    <div className="navbar">
      <>
      <div className="alerts">
        <p /*style={{ color: "yellow" }}*/ >
          {errMsg}
        </p>{" "}
      </div>


        {/* Might Delete */}
        {!toggle ? ( // Conditionally render the sign-up form if 'toggle' is false
          <>
            <div className="authHeader">
              <h1 className="neta">N E T A </h1>
              <h2 className="authTitle"> Never Eating There Again🤢</h2>
            </div>
            <AuthForm
              handleChange={handleChange} //
              handleSubmit={handleSignup}
              inputs={inputs}
              btnText="Sign up"
              errMsg={errMsg}
            />
            <p id="join" onClick={() => toggleForm()}>
              Click to Login
            </p>

            <iframe
              className="youtube"
              width="100%"
              height="400"
              // src="https://giphy.com/embed/JvzGtguF3Ptn2?autoplay=0&amp;mute=5&amp;volume=10%"

              src="https://giphy.com/embed/C3rY8TuHaLuyCkSuDS/video?autoplay=0&amp;mute=5&amp;volume=10%"
              title="Nast Az Restaurants"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </>
        ) : (
          // else render the login form if 'toggle' is true

          <>
            <div className="authHeader">
              <h1 className="neta">N E T A</h1>
              <h2 className="authTitle">🫡 WELCOME BACK 😀</h2>
            </div>
            <h3 className="sign_Back_In" > Sign In Below</h3>
            <AuthForm
              handleChange={handleChange}
              handleSubmit={handleLogin}
              inputs={inputs}
              btnText="Login"
              errMsg={errMsg}
            />
            <p className="login" onClick={() => toggleForm()}>
              Click to Sign Up?
            </p>
            <iframe
              className="youtube"
              width="100%"
              height="400"
              src="https://giphy.com/embed/JvzGtguF3Ptn2?autoplay=0&amp;mute=5&amp;volume=10%"
              // src="https://giphy.com/embed/C3rY8TuHaLuyCkSuDS/video?autoplay=0&amp;mute=5&amp;volume=10%"
              // title="Nast Az Restaurants"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </>
        )}
      </>
    </div>
  );
}
