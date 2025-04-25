import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export function TestComponent() {
  const [result, setResult] = useState(null);
  const makeRequest = useFetch();
  const [update, setUpdate] = useState(false);

  const [chatLog, setChatLog] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       const response = await makeRequest("/test/", "POST");
//       if (response.ok) {
//         const data = await response.json();
//         setResult(data.result);
//       }
//     }
//     fetchData();
//   }, []);

  async function sendMessage() {
    if (inputMessage.trim() === "") return; // Prevent sending empty messages
  
    const userText = inputMessage;
    setInputMessage(""); // Clear the input field
  
    // Add the user's message to the chat log
    setChatLog(prev => [...prev, { sender: "user", text: userText }, { sender: "bot", text: "Natalie is typing..." }]);
  
    try {
      // Send the message to the server
      const response = await makeRequest("/test/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }), // Send the user's input
      });
  
      if (response.ok) {
        const data = await response.json();
        const botReply = data.result; // Get the result from the server
  
        // Update the chat log with the bot's reply
        setChatLog(prev => {
          const newLog = [...prev];
          newLog.pop(); // Remove "Natalie is typing..." placeholder
          newLog.push({ sender: "bot", text: botReply });
          return newLog;
        });
      } else {
        // Handle server errors
        setChatLog(prev => {
          const newLog = [...prev];
          newLog.pop(); // Remove "Natalie is typing..." placeholder
          newLog.push({ sender: "bot", text: "Error: Unable to get a response from Natalie." });
          return newLog;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setChatLog(prev => {
        const newLog = [...prev];
        newLog.pop(); // Remove "Natalie is typing..." placeholder
        newLog.push({ sender: "bot", text: "Error: Something went wrong." });
        return newLog;
      });
    }
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
            onChange={(e) => setInputMessage(e.target.value)} // Update inputMessage state
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }} // Send on Enter key
        />
        <button onClick={sendMessage}>
            Send
        </button>
        </div>
      </div>
    </div>
  );
}

