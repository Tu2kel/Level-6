import React, { useState, useContext } from "react";
import AuthForm from "./AuthForm";
import { UserContext } from "../context/UserProvider";

const initInputs = { username: "", password: "" };

export default function Auth() {
  const [inputs, setInputs] = useState(initInputs);
  const [toggle, setToggle] = useState(false);

  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext) 

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  //Signup
  function handleSignup(e) {
    e.preventDefault();
    signup(inputs);
  }

  // Login
  function handleLogin(e) {
    e.preventDefault();
    login(inputs)
  }

  function toggleForm(){ 
    setToggle((prev) => !prev)
    resetAuthErr() // to reset form from
  }

  return (
    <div className="auth_container">
      <h1>Welcome </h1>
      <h1>Please Login or SignUp</h1>

      <p style={{ color: "red" }}>{errMsg}</p> {/* DELETE IF I WANT */}

      {!toggle ? ( // not Toggle go to signup form
        <>
          <AuthForm
            handleChange={handleChange} //
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}
          />
          <p onClick={toggleForm}>Already a member?</p>
        </>
      ) : (
        // else show login form
        <>
          <AuthForm // value of Comp to specified function
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
          />
          <p onClick={toggleForm}>Not a member?</p>
        </>
      )}
    </div>
  );
}
