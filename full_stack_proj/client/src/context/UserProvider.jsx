import axios from "axios";
import { set } from "mongoose";
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
  }; 

  const [userState, setUserState] = useState(initState);

  const [comments, setComments] = useState([])

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
          // comment: [],
        }));
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  function login(credentials) {
    axios
      .post("/auth/login", credentials)
      .then((res) => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getUserIssues()
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
    
        }));
        // console.log(issues);
      })
      .catch((err) => handleAuthErr(err));
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState({
      user: {},
      token: "",
      issues: [],
      // comment: [],
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
    userAxios.get("/api/issue/user")
      .then((res) => {
        console.log("inside user Issues", res.data);
        setUserState((prevState) => ({
          ...prevState,
          issues: res.data,
        }));
      })
      .catch((err) =>
        console.log("inside getuserIssues", err.response.data.errMsg)
      );
  }

  function addIssue(newIssue) {
    userAxios
      .post("/api/issue", newIssue)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: [...prevState.issues, res.data],
        }));
      })
      .catch((err) => console.log(err));
  }

  console.log(userState);

  function upVote(issueId){
    userAxios.put(`/api/issue/upvote/${issueId} `)
    .then(res => {
      setUserState(prevState => {
        return {
          ...prevState,
          issues: prevState.issues.map(issue => issue._id !== issueId ? issue : res.data)
        }
      })
    })
    .catch(err => console.log(err))
  }

  function downVote(issueId){
    userAxios.put(`/api/issue/downvote/${issueId} `)
    .then(res => {
      setUserState(prevState => {
        return {
          ...prevState,
          issues: prevState.issues.map(issue => issue._id !== issueId ? issue : res.data)
        }
      })
    })
    .catch(err => console.log(err))
  }


  

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
        errMsg: userState.errMsg,
        upVote,
        downVote
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
