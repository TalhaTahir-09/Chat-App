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
      <div className="flex h-full w-full items-center justify-center">
        <div className="sign-in-container flex w-5/6 flex-col items-center justify-center rounded-2xl p-4 md:w-2/5 lg:w-3/12 lg:p-8">
          <div className="signIn-text mb-2 lg:mb-12">
            <h3 className="heading-1" style={fontWeight(500)}>
              Sign In
            </h3>
            <p style={fontWeight(400)}>Hi👋 Welcome Back</p>
          </div>
          <div className="email-password-container w-full flex-col justify-start">
            <label htmlFor="email-input">
              <h4 style={fontWeight(600)}>Email</h4>
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email-input"
              className="input mb-2 mt-2 w-full rounded-2xl border border-solid border-gray-300 p-4 lg:mb-4 lg:mt-4 lg:p-4"
              placeholder="example@gmail.com"
            />
            <label htmlFor="password-input">
              <h4 style={fontWeight(600)}>Password</h4>
            </label>
            <div className="password-eye relative w-full">
              <input
                id="password-input"
                type="password"
                className="nput mb-2 mt-2 w-full rounded-2xl border border-solid border-gray-300 p-4 lg:mb-4 lg:mt-4 lg:p-4"
                placeholder="**********"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                className="eye-btn absolute left-2/4 top-2/4 flex -translate-x-2/4 -translate-y-2/4 items-center justify-center"
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
              className="bg-cyan sign-in-btn mt-4 flex w-full items-center justify-center text-white"
              style={fontWeight(500)}
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <button
              className="bg-cyan sign-in-btn mt-4 flex w-full items-center justify-center text-white"
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
