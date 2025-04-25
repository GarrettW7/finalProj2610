import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Todo } from "../components/Todo";
import { useFetch } from "../hooks/useFetch";
import { useTodos } from "../hooks/useTodos";

export function TodoList() {
  const todos = useTodos();

  // This is a placeholder for the TodoList component
  return (
    <div>
      <Link to="/new">+ New Todo</Link>
      {
        todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))
      }
    </div>
  );
}
