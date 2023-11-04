import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
// import CommentList from "../components/CommentList";

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

  const [publicIssue, setPublicIssue] = useState([]);

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
    axios
      .post("/auth/login", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        getUserIssues();
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

  function getAllIssues() {
    userAxios
      .get("/api/issue")
      .then((res) => {
        // console.log("getAllIssues res:", res.data);
        setPublicIssue(res.data);
      })
      .catch((err) => console.log(`token?😭 `, err.response.data.errMsg));
    // console.log("publicIssues", publicIssue);
  }

  function getUserIssues() {
    userAxios
      .get("/api/issue/user")
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

  function upVote(issueId) {
    userAxios
      .put(`/api/issue/upvote/${issueId} `)
      .then((res) => {
        setUserState((prevState) => {
          return {
            ...prevState,
            issues: prevState.issues.map((issue) =>
              issue._id !== issueId ? issue : res.data
            ),
          };
        });
        setPublicIssue((prevIssues) =>
          prevIssues.map((issue) => (issueId !== issue._id ? issue : res.data))
        );
      })
      .catch((err) => console.log("upVote:", err));
  }

  function downVote(issueId) {
    userAxios
      .put(`/api/issue/downvote/${issueId} `)
      .then((res) => {
        setUserState((prevState) => {
          return {
            ...prevState,
            issues: prevState.issues.map((issue) =>
              issue._id !== issueId ? issue : res.data
            ),
          };
        });
        setPublicIssue((prevIssues) =>
          prevIssues.map((issue) => (issueId !== issue._id ? issue : res.data))
        );
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllIssues();
  }, []);

  const [comments, setComments] = useState([]);

  function getComment() {
    userAxios
      .get(`/api/comment`) //${issueId}
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log("UserPovider Getcomment UseEffect😭", error);
      });
  }

  function addComment(issueId, updates) {
    userAxios
      .post(`/api/comment/${issueId}`, updates)
      .then((response) => {
        setComments((prevComments) => [...prevComments, response.data]);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  }

function editIssue(issueId, updatedIssue) {
  userAxios
    .put(`/api/issue/${issueId}`, updatedIssue)
    .then((res) => {
      // Find the index of the updated issue in the state and update it
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
  userAxios
    .delete(`/api/issue/${issueId}`)
    .then((res) => {
      // Remove the deleted issue from the state
      setUserState((prevState) => ({
        ...prevState,
        issues: prevState.issues.filter((issue) => issue._id !== issueId),
      }));
    })
    .catch((err) => console.log("deleteIssue:", err));
}

    

  return (
    <UserContext.Provider
      value={{ // sends it to area called upon thru UserContext
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
        editIssue
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
