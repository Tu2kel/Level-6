import axios from "axios";
import React, { useState } from "react";

export const UserContext = React.createContext();

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props) {
  const initState = { 
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "",
    todos: [],
    errMsg: ""
    };

  const [userState, setUserState] = useState(initState);

    async function signup(credentials) {
      try {
        const response = await axios.post("/auth/signup", credentials);
        const { user, token } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      } catch (error) {
        console.error("Error during signup: Username Taken", error);
      }
    }


    function login(credentials){
        console.log("login in userpro", credentials);
        axios
          .post("/auth/login", credentials)
          .then((res) => {
            console.log("Login response:", res.data);
            const { user, token } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            getUserTodos()
            setUserState(prevUserState => ({
              ...prevUserState,
              user,
              token,
            }))
            console.log(user.todos)
          })
          .catch((err) => console.error("Login Error", err.response ? err.response.data.errMsg : errMessage));
    }

    function logout(){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUserState({
        user:{},
        token: "",
        todos: []
      })
    }

    function getUserTodos() {
      userAxios
        .get("/api/todo/user")
        .then((res) => {
          setUserState((prevState) => ({
            ...prevState,
            todos: res.data
          }));
        })
        .catch((err) => console.log(err.response.data.errMsg));
    }

    

    async function addTodo(newTodo) {
      try {
        const response = await userAxios.post("/api/todo", newTodo);
        const updatedTodos = [...userState.todos, response.data];

        setUserState((prevState) => ({
          ...prevState,
          todos: updatedTodos,
        }));
      } catch (error) {
        console.error(
          "Error adding todo:",
          error.response?.data?.errMsg || error.message
        );
      }
    }



  return (
    <UserContext.Provider
      value={{
        ...userState, 
        signup,
        login,
        logout,
        addTodo
      }}>
      { props.children }
    </UserContext.Provider>
  );
}
