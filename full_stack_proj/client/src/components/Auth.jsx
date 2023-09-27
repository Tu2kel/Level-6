import React, { useState } from "react";
import AuthForm from "./AuthForm";

const initInputs = { username: "", password: "" };

export default function Auth() {
  const [inputs, setInputs] = useState(initInputs);
  const [toggle, setToggle] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  // signup
  function handleSignup(e) {
    e.preventDefault();
  }

  // login
  function handleLogin(e) {
    e.preventDefault();
  }

  return (
    <div className="auth_container">
      <h1>Todo App</h1>
      {!toggle ? ( 
        <>
          <AuthForm
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
          />
          <p onClick={() => setToggle((prev) => !prev)}>Already a member?</p>
        </>
      ) : (
        <>
          <AuthForm
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
          />
          <p onClick={() => setToggle((prev) => !prev)}>Not a member?</p>
        </>
      )}
    </div>
  );
}
