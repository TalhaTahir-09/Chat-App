import "./App.css";
import ChatRoom from "./assets/Components/ChatRoom.jsx";
import SignIn from "./assets/Components/SignIn.jsx";
import SignUp from "./assets/Components/SignUp.jsx";

import Welcome from "./assets/Components/Welcome.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/chat-room" element={<ChatRoom />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
