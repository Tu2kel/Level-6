import axios from "axios";
import React, { useState } from "react";

export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = ` Bearer ${token}`;
  return config;
});

export default function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "", //state will exist after refresh
    issues: [],
    errMsg: "",
  }; //

  const [userState, setUserState] = useState(initState);

  function signup(credentials) {
    axios
      .post("/auth/signup", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  function login(credentials) {
    // console.log(" 5 login in userpro", credentials);
    axios.post("/auth/login", credentials)
      .then((res) => {
        // console.log(6, res.data);
        // console.log("7, Login response:", res.data, req);
        const { user, token } = res.data;
        // console.log(8, res, req, data);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        // console.log(9, res, req, data);
        getUserIssues();
        // console.log(10, res, req, data);
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
        // console.log(todos);
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState({
      user: {},
      token: "",
      issues: [],
    });
  }

  function handleAuthErr(errMsg) {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  function resetAuthErr() {
    setUserState((prevState) => ({
      ...prevState,
      errMsg: " ",
    }));
  }

  function getUserIssues() {
    console.log(3, res, req, data);
    userAxios.get("/api/issue/user")
    console.log(4, res, req, data)
      .then((res) => {
        // console.log("inside user Issues", res.data);
        setUserState((prevState) => ({
          ...prevState,
          issues: res.data
        }));
      })
      .catch((err) => console.log("inside getuserIssues", err.response.data.errMsg));
  }

  function addIssue(newIssue) {
    
    userAxios.post("/api/issue", newIssue)   
      .then((res) => {
        console.log(3, "Response from serveraddIssue in UP:");
        setUserState((prevState) => ({
          ...prevState,
          issues: [...prevState.issues, res.data]
        }));
        console.log(2, res, req, data);
      })
      .catch((err) => console.log("addIssue failed", err.response.data.errMsg)); // Add a closing parenthesis and a semicolon here
  }


  //  async function addIssue(newIssue) {
  //    console.log("addIssue Func newIssue:", newIssue);
  //    try {
  //      const response = await userAxios.post("/api/issue", newIssue);
  //      const updatedIssues = [...userState.issue, response.data];

  //      setUserState((prevState) => ({
  //        ...prevState,
  //        issue: updatedIssues,
  //      }));
  //    } catch (error) {
  //      console.error(
  //        "Error adding issue:",
  //        error.response?.data?.errMsg || error.message
  //      );
  //    }
  //  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addIssue,
        getUserIssues,
        resetAuthErr,
        // addComment,
      }}>
      { props.children }
    </UserContext.Provider>
  );
}
