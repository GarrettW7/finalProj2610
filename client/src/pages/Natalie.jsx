import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export function TestComponent() {
  const [result, setResult] = useState(null);
  const makeRequest = useFetch();

  useEffect(() => {
    async function fetchData() {
      const response = await makeRequest("/test/");
      if (response.ok) {
        const data = await response.json();
        setResult(data.result); // Set the result from the backend
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Method Result</h1>
      <p>{result}</p>
    </div>
  );
}