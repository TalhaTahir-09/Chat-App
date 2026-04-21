import { auth } from "../firebase-config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { fontWeight, passwordShower } from "../index.js";
import { googleProvider } from "../firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function SignIn(authState) {
  // Welcome Container

  function handleSignBtn() {
    const sliderContainer = document.getElementById("slider-container");
    sliderContainer.classList.add("-translate-x-full");
  }
  // Sign in container
  const [auth, setAuth] = useState(authState.authState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSignIn = async () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.replace("/chat-room")
      setAuth(auth);
      }).catch((err) => {
      console.log(err.code === "auth/invalid-email");
      if(err.code === "auth/invalid-email"){
        setError("Invalid of email or password!")
      }
      })
    }
  const handleSignInWithGoogle = async () => {
    try {
      signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
    setAuth(auth);
  };
  const notify = () =>
    toast("👋 Welcome to TCA!", {
      position: "top-right",
      autoClose: 4999,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "dark",
    });
  const handleSignOut = async () => {
    try {
      signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    notify();
  }, []);
  return (
    <>
      <div className="flex h-full w-full items-center  justify-center text-center sm:p-4 sm:pt-4">
        <div className="sign-in-container border-radius-20px flex flex-col items-center overflow-x-hidden rounded-2xl">
          <div
            className="slider-container flex transform flex-row items-stretch transition-all duration-500"
            id="slider-container"
          >
            <div className="flex w-full flex-shrink-0 flex-col gap-4 p-6">
              <div className="signIn-text my-auto flex flex-col">
                <h3 className="heading-1" style={fontWeight(500)}>
                  Welcome to TCA! 👋
                </h3>
                <p style={fontWeight(400)} className="mb-4 mt-4">
                  Please Sign up or Log in
                </p>
              </div>
              <div className="signInButton-container mt-auto w-full">
                <button
                  onClick={() => handleSignBtn()}
                  className="bg-cyan sign-in-btn flex w-full items-center justify-center text-white"
                  style={fontWeight(500)}
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleSignBtn()}
                  className="bg-cyan sign-in-btn my-auto mt-4 flex w-full items-center justify-center text-white"
                  style={fontWeight(500)}
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className="w-full flex-shrink-0 p-6">
              <div className="signIn-text mb-2 lg:mb-12">
                <h3 className="heading-1" style={fontWeight(500)}>
                  Log In
                </h3>
                <p style={fontWeight(400)}>Hi👋 Sign up to talk to world!</p>
              </div>
              <div className="email-password-container relative w-full flex-col justify-start text-left">
                <label htmlFor="email-input" className="flex gap-4 w-fit justify-center items-center">
                  <h4 style={fontWeight(600)}>Email</h4><span className="text-red-600 absolute left-16 font-normal">{error}</span>
                </label>
                <input
                  id="email-input"
                  type="email-input"
                  className="nput mb-2 mt-2 box-border w-full rounded-2xl border border-solid border-gray-300 p-4 focus:border focus:border-solid focus:border-blue-500 lg:mb-4 lg:mt-4 lg:p-4"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <label htmlFor="password-input">
                  <h4 style={fontWeight(600)}>Password</h4>
                </label>
                <div className="password-eye relative w-full">
                  <input
                    id="password-input"
                    type="password"
                    className="nput mb-2 mt-2 box-border w-full rounded-2xl border border-solid border-gray-300 p-4 focus:border focus:border-solid focus:border-blue-500 lg:mb-4 lg:mt-4 lg:p-4"
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
                    <i
                      className="bx bx-hide heading-4"
                      id="password-shower"
                    ></i>
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
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default SignIn;
