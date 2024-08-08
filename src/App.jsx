import "./App.css";
import ChatRoom from "./assets/Components/ChatRoom.jsx";
import SignIn from "./assets/Components/SignIn.jsx";
import { auth } from "./assets/firebase-config.js";
import Welcome from "./assets/Components/Welcome.jsx";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [authState, setAuthState] = useState(auth);
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user && window.location.href !== "https://chat-15tmxjsqh-talhatahir-09s-projects.vercel.app/chat-room") {
        console.log("Ran")
        window.location.replace("/chat-room");
      }
    });
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/sign-in" element={<SignIn authState={authState} />} />
          <Route path="/chat-room" element={<ChatRoom />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
