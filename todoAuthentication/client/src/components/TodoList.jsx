import React from 'react'
import Todo from './Todo'
import Profile from './Profile'

export default function TodoList(props) {
  const { todos } = props
  
  return (
    <div className="todo_list">
      { todos.map(todo => <Todo {...todo} key={todo._id} />)}
    </div>
  )
}