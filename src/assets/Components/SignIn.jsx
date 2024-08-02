import { useEffect, useState } from "react";
import { fontWeight, passwordShower } from "../index.js";
import { auth, googleProvider } from "../firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const currentUser = auth?.currentUser

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSignIn = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSignInWithGoogle = async () => {
    try {
      signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSignOut = async () => {
    try {
      signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const authChange = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/chat-room");
      }
    });
    return () => authChange();
  }, []);
  return (
    <div className="flex-center width-100 height-100">
      <div className="flex-column-center sign-in-container border-radius-20px">
        <div className="signIn-text mb-3">
          <h3 className="h-1" style={fontWeight(500)}>
            Sign In
          </h3>
          <p style={fontWeight(400)}>Hi👋 Welcome Back</p>
        </div>
        <div className="email-password-container width-100 flex-start flex-column">
          <label htmlFor="email-input">
            <h4 style={fontWeight(600)}>Email</h4>
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email-input"
            className="border-radius-20px p-1 input mt-1 mb-1"
            placeholder="example@gmail.com"
          />
          <label htmlFor="password-input">
            <h4 style={fontWeight(600)}>Password</h4>
          </label>
          <div className="password-eye position-relative width-100">
            <input
              id="password-input"
              type="password"
              className="border-radius-20px p-1 input mt-1 mb-1"
              placeholder="**********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              className="absolute-center eye-btn"
              onClick={() => {
                passwordShower("password-shower", "password-input");
              }}
            >
              <i className="bx bx-hide h-4" id="password-shower"></i>
            </button>
          </div>
        </div>
        <div
          className={`forgot-password-container flex width-100`}
          style={fontWeight(100)}
        >
          <h5 className="h-5 color-cyan" style={fontWeight(600)}>
            Forgot Password?
          </h5>
        </div>
        <div className="signInButton-container width-100">
          <button
            className="mt-1 bg-cyan color-white flex-center width-100 sign-in-btn"
            style={fontWeight(500)}
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button
            className="mt-1 bg-cyan color-white flex-center width-100 sign-in-btn"
            style={fontWeight(500)}
            onClick={handleSignInWithGoogle}
          >
            Sign In With Google
          </button>
          <button
            className="mt-1 bg-cyan color-white flex-center width-100 sign-in-btn"
            style={fontWeight(500)}
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
