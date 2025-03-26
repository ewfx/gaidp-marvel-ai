import React, { useState } from "react";
import axios from "axios";

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace the URL with your custom GPT model's API endpoint
      const result = await axios.post(
        "https://localhost:44338/api/prompt/generate",
        {
          context: userInput,
        }
      );
      const obj = JSON.parse(result.data.response);

      console.log(obj.choices[0].message.content);
      setResponse(obj.choices[0].message.content);
    } catch (error) {
      console.error("Error calling the GPT API:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center", // This shorthand centers the content both horizontally and vertically
        height: "100vh",
      }}
    >
      <h1>Custom PlatForm Intregration Chatbot</h1>
      <ul>
        <li>provide agentic capabilities for incident resolution</li>
        <li>Contextual recommendations</li>
        <li>Ability to leverage enterprise information for troubleshooting</li>
        <li>Context based data extraction</li>
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your prompt here for platform Support"
          rows="10"
          cols="50"
        />
        <br></br>
        <br></br>
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
