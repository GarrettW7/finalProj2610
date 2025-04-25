import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const makeRequest = useFetch();
  async function fetchTodos() {
    const response = await makeRequest("/todos/");
    if (response.ok) {
      const {todos} = await response.json();
      setTodos(todos);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  return todos;
}
