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
    reviews: [],
    errMsg: "",
  };

  const [userState, setUserState] = useState(initState);

  const [publicReview, setPublicReview] = useState([]);

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

        getUserReviews(); // Get the user's reviews from the backend

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
      reviews: [],
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

  function getAllReviews() {
    // Make a request to the backend to get all reviews
    userAxios
      .get("/api/review")
      .then((res) => {
        // Set the publicReview state variable to the response data
        setPublicReview(res.data);
      })
      .catch((err) => console.log(`token?😭 `, err.response.data.errMsg));
    // console.log("publicReviews", publicReview);
  }

  function getUserReviews() {
    // Make a request to the backend to get the user's reviews
    userAxios
      .get("/api/review/user")
      .then((res) => {
        // Update the user state with the user's reviews
        setUserState((prevState) => ({
          ...prevState,
          reviews: res.data,
        }));
      })
      .catch((err) =>
        console.log("inside getuserreview😭", err.response.data.errMsg)
      );
  }

  function addReview(newReview) {
    // Make a request to the backend to add a new review
    userAxios
      .post("/api/review", newReview)
      .then((res) => {
        // Add the new review to the user state
        setUserState((prevState) => ({
          ...prevState,
          reviews: [...prevState.reviews, res.data],
        }));
      })
      .catch((err) => console.log(err));
  }

  // console.log('userState:', userState);

  function upVote(reviewId) {
    // Make a request to the backend to upvote an review.
    userAxios
      .put(`/api/review/upvote/${reviewId} `)
      .then((res) => {
        // Update the user state and public reviews to reflect the upvote.
        setUserState((prevState) => ({
          ...prevState,
          reviews: prevState.reviews.map((review) =>
            review._id !== reviewId ? review : res.data
          ),
        }));
        setPublicReview((prevReviews) =>
          prevReviews.map((review) => (reviewId !== review._id ? review : res.data))
        );
      })
      .catch((err) => console.log("upVote:", err));
  }

  function downVote(reviewId) {
    // Make a request to the backend to downvote an review.
    userAxios
      .put(`/api/review/downvote/${reviewId} `)
      .then((res) => {
        // Update the user state and public reviews to reflect the downvote.
        setUserState((prevState) => ({
          ...prevState,
          reviews: prevState.reviews.map((review) =>
            review._id !== reviewId ? review : res.data
          ),
        }));
        setPublicReview((prevReviews) =>
          prevReviews.map((review) => (reviewId !== review._id ? review : res.data))
        );
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllReviews(); // Get all reviews when the component mounts
  }, []);

  const [comments, setComments] = useState([]);

  function getComment() {
    // Make a request to the backend to get all comments.
    userAxios
      .get(`/api/comment`) //${reviewId}
      .then((response) => {
        // Set the comments state variable to the response data.
        setComments(response.data);
      })
      .catch((error) => {
        console.log("UserPovider Getcomment UseEffect😭", error);
      });
  }

  function addComment(reviewId, updates) {
    // Make a request to the backend to add a new comment to an review.
    userAxios
      .post(`/api/comment/${reviewId}`, updates)
      .then((response) => {
        // Add the new comment to the comments state variable.
        setComments((prevComments) => [...prevComments, response.data]);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  }

  function editReview(reviewId, updatedReview) {
    // Make a request to the backend to update an review.
    userAxios
      .put(`/api/review/${reviewId}`, updatedReview)
      .then((res) => {
        // Update the review in the user state.
        setUserState((prevState) => ({
          ...prevState,
          reviews: prevState.reviews.map((review) =>
            review._id === reviewId ? res.data : review
          ),
        }));
      })
      .catch((err) => console.log("editReview:", err));
  }

  function deleteReview(reviewId) {
    // Make a request to the backend to delete an review.
    userAxios
      .delete(`/api/review/${reviewId}`)
      .then((res) => {
        // Remove the review from the user state.
        setUserState((prevState) => ({
          ...prevState,
          reviews: prevState.reviews.filter(
            (review) => review._id !== reviewId
          ),
        }));
      })
      .catch((err) => console.log("deleteReview:", err));
  }

  return (
    <UserContext.Provider
      value={{
        // be passed to all of the child components
        ...userState,
        publicReview,
        userAxios,
        comments,
        errMsg: userState.errMsg,
        signup,
        login,
        logout,
        addReview,
        getAllReviews,
        addComment,
        getComment,
        getUserReviews,
        resetAuthErr,
        upVote,
        downVote,
        deleteReview,
        editReview,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
