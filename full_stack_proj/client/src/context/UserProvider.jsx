import axios from "axios";
import React, { useState, useEffect } from "react";

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

  // const [comments, setComments] = useState([])

  const [ publicIssue, setPublicIssue ] = useState([])

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
    axios.post("/auth/login", credentials)
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
        // console.log('token:', token);
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

  function getAllIssues(){
    axios.get("/api/issue")
    .then(res => {
      setPublicIssue(res.data)
    })
    .catch(err => console.log(`token?😭 `, err.response.data.errMsg))
    console.log("publicIssues", publicIssue )
  }

  function getUserIssues() {
    userAxios.get("/api/issue/user")
      .then((res) => {
        // console.log("inside user Issues", res.data);
        setUserState((prevState) => ({
          ...prevState,
          issues: res.data,
        }));
      })
      .catch((err) =>
        console.log("inside getuserIssue😭", err.response.data.errMsg)
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

  // console.log('userState:', userState);

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
    .catch(err => console.log('upVote:', err))
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

//  React.
 useEffect(() => {
   getAllIssues()
 }, [publicIssue.length]);
 
//  React.useEffect(() => {
//    getAllComments()
//    // getIssueData();
//  }, [comments.length]);
  

  return (
    <UserContext.Provider
      value={{
        ...userState,
        publicIssue,
        signup,
        login,
        logout,
        addIssue,
        getAllIssues,
        getUserIssues,
        resetAuthErr,
        upVote,
        downVote,
        // getAllComments,
        errMsg: userState.errMsg,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
