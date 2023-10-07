import React, { useState } from "react";
import axios from "axios";

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
        handleAuthErr("Error during signup: Username Taken", error);
      }
    }


    function login(credentials){
        console.log("login in userpro", credentials);
        axios
          .post("/auth/login", credentials)
          .then(res => {
            console.log(res.data)
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
            console.log(todos)
          })
          .catch(err => handleAuthErr(err.response.data.errMsg))
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

    function handleAuthErr(errMsg){
      setUserState(prevState => ({
        ...prevState, 
        errMsg
      }))
    }

    function resetAuthErr(){
      setUserState(prevState => ({
        ...prevState,
        errMsg:" "
      }))
    }

    function getUserTodos() {
      
      userAxios.get("/api/todo/user")
        .then((res) => {
          // console.log("inside user Todos", res.data);
          setUserState((prevState) => ({
            ...prevState,
            todos: res.data
          }));
        })
        .catch((err) => console.log(err.response.data.errMsg));
    }

    

    async function addTodo(newTodo) {
      console.log('addTodo Func newTodo:', newTodo)
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
        addTodo,
        resetAuthErr
      }}>
      { props.children }
    </UserContext.Provider>
  );
}
