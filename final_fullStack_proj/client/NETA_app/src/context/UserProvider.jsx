import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = ` Bearer ${token}`;
  return config;
});

export default function UserProvider(props) {
  //initial State
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "", //state will exist after refresh
    issues: [],
    errMsg: "",
  };

  const [userState, setUserState] = useState(initState);

  const [publicIssue, setPublicIssue] = useState([]);

  function signup(credentials) {
    axios
      .post("/auth/signup", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token); // Save the user and token to local storage
        localStorage.setItem("user", JSON.stringify(user));

        setUserState((prevUserState) => ({
          // Update the user state with the new user and token
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  function login(credentials) {
    axios
      .post("/auth/login", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token); // Save the user and token to local storage

        localStorage.setItem("user", JSON.stringify(user));

        getUserIssues(); // Get the user's issues from the backend

        setUserState((prevUserState) => ({
          // Update the user state with the new user and token
          ...prevUserState,
          user,
          token,
        }));
        // console.log('token:', token);
      })
      .catch((err) => handleAuthErr(err));
  }

  function logout() {
    // Remove the user and token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUserState({
      // Update the user state to the initial state
      user: {},
      token: "",
      issues: [],
    });
  }

  function handleAuthErr(errMsg) {
    // Update the user state with the error message.
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  function resetAuthErr() {
    // Update the user state to remove the error message.
    setUserState((prevState) => ({
      ...prevState,
      errMsg: " ",
    }));
  }

  function getAllIssues() {
    // Make a request to the backend to get all issues
    userAxios
      .get("/api/issue")
      .then((res) => {
        // Set the publicIssue state variable to the response data
        setPublicIssue(res.data);
      })
      .catch((err) => console.log(`token?😭 `, err.response.data.errMsg));
    // console.log("publicIssues", publicIssue);
  }

  function getUserIssues() {
    // Make a request to the backend to get the user's issues
    userAxios
      .get("/api/issue/user")
      .then((res) => {
        // Update the user state with the user's issues
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
    // Make a request to the backend to add a new issue
    userAxios
      .post("/api/issue", newIssue)
      .then((res) => {
        // Add the new issue to the user state
        setUserState((prevState) => ({
          ...prevState,
          issues: [...prevState.issues, res.data],
        }));
      })
      .catch((err) => console.log(err));
  }

  // console.log('userState:', userState);

  function upVote(issueId) {
    // Make a request to the backend to upvote an issue.
    userAxios
      .put(`/api/issue/upvote/${issueId} `)
      .then((res) => {
        // Update the user state and public issues to reflect the upvote.
        setUserState((prevState) => ({
          ...prevState,
          issues: prevState.issues.map((issue) =>
            issue._id !== issueId ? issue : res.data
          ),
        }));
        setPublicIssue((prevIssues) =>
          prevIssues.map((issue) => (issueId !== issue._id ? issue : res.data))
        );
      })
      .catch((err) => console.log("upVote:", err));
  }

  function downVote(issueId) {
    // Make a request to the backend to downvote an issue.
    userAxios
      .put(`/api/issue/downvote/${issueId} `)
      .then((res) => {
        // Update the user state and public issues to reflect the downvote.
        setUserState((prevState) => ({
          ...prevState,
          issues: prevState.issues.map((issue) =>
            issue._id !== issueId ? issue : res.data
          ),
        }));
        setPublicIssue((prevIssues) =>
          prevIssues.map((issue) => (issueId !== issue._id ? issue : res.data))
        );
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllIssues(); // Get all issues when the component mounts
  }, []);

  const [comments, setComments] = useState([]);

  function getComment() {
    // Make a request to the backend to get all comments.
    userAxios
      .get(`/api/comment`) //${issueId}
      .then((response) => {
        // Set the comments state variable to the response data.
        setComments(response.data);
      })
      .catch((error) => {
        console.log("UserPovider Getcomment UseEffect😭", error);
      });
  }

  function addComment(issueId, updates) {
    // Make a request to the backend to add a new comment to an issue.
    userAxios
      .post(`/api/comment/${issueId}`, updates)
      .then((response) => {
        // Add the new comment to the comments state variable.
        setComments((prevComments) => [...prevComments, response.data]);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  }

  function editIssue(issueId, updatedIssue) {
    // Make a request to the backend to update an issue.
    userAxios
      .put(`/api/issue/${issueId}`, updatedIssue)
      .then((res) => {
        // Update the issue in the user state.
        setUserState((prevState) => ({
          ...prevState,
          issues: prevState.issues.map((issue) =>
            issue._id === issueId ? res.data : issue
          ),
        }));
      })
      .catch((err) => console.log("editIssue:", err));
  }

  function deleteIssue(issueId) {
    // Make a request to the backend to delete an issue.
    userAxios
      .delete(`/api/issue/${issueId}`)
      .then((res) => {
        // Remove the issue from the user state.
        setUserState((prevState) => ({
          ...prevState,
          issues: prevState.issues.filter((issue) => issue._id !== issueId),
        }));
      })
      .catch((err) => console.log("deleteIssue:", err));
  }

  return (
    <UserContext.Provider
      value={{
        // be passed to all of the child components
        ...userState,
        publicIssue,
        userAxios,
        comments,
        errMsg: userState.errMsg,
        signup,
        login,
        logout,
        addIssue,
        getAllIssues,
        addComment,
        getComment,
        getUserIssues,
        resetAuthErr,
        upVote,
        downVote,
        deleteIssue,
        editIssue,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
