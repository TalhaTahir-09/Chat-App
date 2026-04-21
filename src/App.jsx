import "./App.css";
import ChatRoom from "./assets/Components/ChatRoom.jsx";
import { auth } from "./assets/firebase-config.js";
import Welcome from "./assets/Components/Welcome.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [authState, setAuthState] = useState(auth);
  useEffect(() => {
    console.log("Ran")
    auth.onAuthStateChanged(function (user) {
      if (user && window.location.href !== "https://chatapptalha.vercel.app/chat-room") {
        console.log("Ran");
        window.location.replace("/chat-room");
      }
    });
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome  authState={authState}  />} />
          <Route path="/chat-room" element={<ChatRoom />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
