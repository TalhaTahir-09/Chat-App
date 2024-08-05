import { useEffect, useState } from "react";
import { fontWeight, passwordShower } from "../index.js";
import { googleProvider } from "../firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function SignIn(authState) {

  const [auth, setAuth] = useState(authState.authState);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSignIn = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
    setAuth(auth);
  };
  const handleSignInWithGoogle = async () => {
    try {
      signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
    setAuth(auth);
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex justify-center items-center flex-col sign-in-container rounded-2xl">
          <div className="signIn-text mb-12">
            <h3 className="heading-1" style={fontWeight(500)}>
              Sign In
            </h3>
            <p style={fontWeight(400)}>Hi👋 Welcome Back</p>
          </div>
          <div className="email-password-container w-full justify-start flex-col">
            <label htmlFor="email-input">
              <h4 style={fontWeight(600)}>Email</h4>
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email-input"
              className="rounded-2xl border border-solid border-gray-300 w-full p-4 input mt-4 mb-4"
              placeholder="example@gmail.com"
            />
            <label htmlFor="password-input">
              <h4 style={fontWeight(600)}>Password</h4>
            </label>
            <div className="password-eye relative w-full">
              <input
                id="password-input"
                type="password"
                className="rounded-2xl border border-solid border-gray-300 w-full p-4 input mt-4 mb-4"
                placeholder="**********"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                className="eye-btn flex justify-center items-center absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                onClick={() => {
                  passwordShower("password-shower", "password-input");
                }}
              >
                <i className="bx bx-hide heading-4" id="password-shower"></i>
              </button>
            </div>
          </div>
          <div
            className={`forgot-password-container flex w-full`}
            style={fontWeight(100)}
          >
            <h5 className="heading-5 color-cyan" style={fontWeight(600)}>
              Forgot Password?
            </h5>
          </div>
          <div className="signInButton-container w-full">
            <button
              className="mt-4 bg-cyan text-white flex justify-center items-center w-full sign-in-btn"
              style={fontWeight(500)}
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <button
              className="mt-4 bg-cyan text-white flex justify-center items-center w-full sign-in-btn"
              style={fontWeight(500)}
              onClick={handleSignInWithGoogle}
            >
              Sign In With Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignIn;
