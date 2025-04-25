import cookies from "js-cookie";
import { use, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
export function Todo({todo}) {
  const [completed, setCompleted] = useState(todo.completed);
  const [hasError, setHasError] = useState(false);
  const makeRequest = useFetch();

  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  }, [hasError])

  async function onCheckChange(e) {
    // assume that the request is going to work
    setCompleted(!completed);
    const response = await makeRequest(`/todos/${todo.id}/`, "PUT", {
      completed: e.target.checked,
    });

    if(!response.ok) {
      setHasError(true);
      // setCompleted(old => !old);
    }

  }
  return (
    <>
      {hasError && <div className="error-popup">An Error Occurred: Please refresh the page</div>}
      <div>
        <h2>
          {todo.title}
          <input
            type='checkbox'
            checked={completed}
            onChange={onCheckChange}
          />
        </h2>
        <p>{todo.description}</p>
      </div>
    </>
  )
}
