import { useState } from "react";
import { useNavigate } from "react-router";
import cookies from "js-cookie";
import { useFetch } from "../hooks/useFetch";

export function CreateTodo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const makeRequest = useFetch();

    const response = await makeRequest("/todos/", "POST", {
      title,
      description
    });

    if (response.ok) {
      navigate("/");
    }
  }
  // This is a placeholder for the CreateTodo component
  return (
    <div>
      <h1>Create Todo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Todo Title:
          <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}/>
        </label>
        <br />
        <label>
          Todo Description:
          <textarea name="description" onChange={e => setDescription(e.target.value)} value={description}></textarea>
        </label>
        <br />
        <button type="submit">Create Todo</button>
      </form>
    </div>
  );
}
