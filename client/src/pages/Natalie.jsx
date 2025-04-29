import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export function NataliesPage() {
  const makeRequest = useFetch();
  const [chatLog, setChatLog] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  async function sendMessage() {
    if (inputMessage.trim() === "") return; // Prevent sending empty messages

    const userText = inputMessage; // Get the user's input
    setInputMessage(""); // Clear the input field

    // Add the user's message to the chat log
    setChatLog((prev) => [...prev, { sender: "User", text: userText }, { sender: "Natalie", text: "Natalie is typing..." }]);

    try {
      // Send the message and history to the server
      const response = await makeRequest("/test/", "POST", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText, history: chatLog }), // Combine message and history
      });

      if (response.ok) {
        const data = await response.json();
        const botReply = data.result; // Get the result from the server

        // Update the chat log with the bot's reply
        setChatLog((prev) => {
          const newLog = [...prev];
          newLog.pop(); // Remove "Natalie is typing..." placeholder
          newLog.push({ sender: "Natalie", text: botReply });
          return newLog;
        });
      } else {
        // Handle server errors
        setChatLog((prev) => {
          const newLog = [...prev];
          newLog.pop(); // Remove "Natalie is typing..." placeholder
          newLog.push({ sender: "Natalie", text: "Error: Unable to get a response from Natalie." });
          return newLog;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setChatLog((prev) => {
        const newLog = [...prev];
        newLog.pop(); // Remove "Natalie is typing..." placeholder
        newLog.push({ sender: "Natalie", text: "Error: Something went wrong." });
        return newLog;
      });
    }
  }

  return (
    <div>
      <h1>Welcome to the Natalie page! </h1>

      {/* Chatbot UI */}
      <div id="chatContainer">
        <div id="chatLog">
          {chatLog.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.sender}: {msg.text}
            </div>
          ))}
        </div>

        <div id="chatInputArea">
          <textarea
            id="chatInput"
            placeholder="Ask Natalie..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)} // Update inputMessage state
            onInput={(e) => {
              e.target.style.height = "auto"; // Reset height to auto
              e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on content
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }} // Send on Enter key without Shift
            rows={1} // Initial number of rows
            style={{ resize: "none", overflow: "hidden" }} // Prevent manual resizing
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}