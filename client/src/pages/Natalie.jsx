import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export function TestComponent() {
  const [result, setResult] = useState(null);
  const makeRequest = useFetch();

  const [chatLog, setChatLog] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await makeRequest("/test/");
      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      }
    }
    fetchData();
  }, []);

  async function sendMessage() {
    if (inputMessage.trim() === "") return;

    const userText = inputMessage;
    setInputMessage("");

    setChatLog(prev => [...prev, { sender: "user", text: userText }, { sender: "bot", text: "Natalie is typing..." }]);

    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText })
    });

    const data = await response.json();
    const botReply = data.reply;

    setChatLog(prev => {
      const newLog = [...prev];
      newLog.pop(); // remove "typing..." placeholder
      newLog.push({ sender: "bot", text: botReply });
      return newLog;
    });
  }

  return (
    <div>
      <h1>Test Method Result</h1>
      <p>{result}</p>

      {/* Chatbot UI */}
      <div id="chatContainer">
        <div id="chatLog">
          {chatLog.map((msg, index) => (
            <div key={index} className={msg.sender}>
              {msg.sender}: {msg.text}
            </div>
          ))}
        </div>

        <div id="chatInputArea">
          <input
            id="chatInput"
            type="text"
            placeholder="Ask Natalie..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
          />
          <button onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

