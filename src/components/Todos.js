import React, { useEffect, useState } from "react";

const TodosContext = React.createContext({
  todos: [], fetchTodos: () => {}
})

export default function Todos() {
  const [todos, setTodos] = useState([])
  const fetchTodos = async () => {
    const response = await fetch("http://127.0.0.1:8000/book/todo")
    const todos = await response.json()
    setTodos(todos.data)
  }
  useEffect(() => {
    fetchTodos()
  }, [])
  return (
    <TodosContext.Provider value={{todos, fetchTodos}}>
        {todos.map((todo) => (
          <b>{todo.item}</b>
        ))}
    </TodosContext.Provider>
  )
}