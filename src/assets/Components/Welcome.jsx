import { fontWeight } from "../index.js";
import { signOut } from "firebase/auth";
import { auth } from '../firebase-config.js'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function SignIn() {
  const notify = () =>
  toast('👋 Welcome to TCA!', {
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
  }, [])
  return (
    <>
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col justify-center items-center sign-in-container rounded-2xl border-radius-20px">
        <div className="signIn-text mb-4 flex flex-col justify-center items-center">
          <h3 className="heading-1" style={fontWeight(500)}>
            Welcome to TCA! 👋
          </h3>
          <p style={fontWeight(400)} className="mt-4 mb-4">
            Please Sign up
          </p>
        </div>
        <div className="signInButton-container w-full"></div>
          <a
            href="/sign-in"
            className="mt-4 bg-cyan text-white flex justify-center items-center w-full sign-in-btn"
            style={fontWeight(500)}
          >
            Sign In
          </a>
          <button
            className="mt-4 w-full bg-cyan text-white flex items-center justify-center sign-in-btn"
            style={fontWeight(500)}
            onClick={handleSignOut}
          >
            Sign Out
          </button>
      </div>
    </div>
    <ToastContainer />

    </>
  );
}
export default SignIn;
