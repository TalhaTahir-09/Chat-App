import { fontWeight } from "../index.js";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function SignIn() {
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
      <div className="flex h-full w-full items-center justify-center text-center sm:p-4 sm:pt-4">
        <div className="sign-in-container border-radius-20px flex flex-col items-center justify-center rounded-2xl p-4 sm:p-6">
          <div className="signIn-text mb-4 flex flex-col items-center justify-center">
            <h3 className="heading-1" style={fontWeight(500)}>
              Welcome to TCA! 👋
            </h3>
            <p style={fontWeight(400)} className="mb-4 mt-4">
              Please Sign up
            </p>
          </div>
          <div className="signInButton-container w-full"></div>
          <a
            href="/sign-in"
            className="bg-cyan sign-in-btn mt-4 flex w-full items-center justify-center text-white"
            style={fontWeight(500)}
          >
            Sign In
          </a>
          <button
            className="bg-cyan sign-in-btn mt-4 flex w-full items-center justify-center text-white"
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
