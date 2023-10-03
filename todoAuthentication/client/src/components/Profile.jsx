import React, { useContext } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Todo from "./Todo";
import { UserContext } from "../context/UserProvider";

export default function Profile() {
  const {
    user: { username },
    addTodo,
    todos
  } = useContext(UserContext);
  console.log(todos)
  console.log(username)

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Add A Todo</h3>
      <TodoForm addTodo={addTodo} />
      <h3>Your Todos</h3>
      <TodoList todos={todos}/>
    </div>
  )
}
