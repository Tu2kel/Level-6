import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Todo from "./Todo";

export default function Profile() {
  return (
    <div className="profile">
      <h1>Welcome @Username!</h1>
      <h3>Add A Comment</h3>
      <TodoForm />
      <h3>Your comments</h3>
    </div>
  );
}
