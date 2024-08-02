import { fontWeight } from "../index.js";

function SignIn() {
  return (
    <div className="flex-center width-100 height-100">
      <div className="flex-column-center sign-in-container border-radius-20px">
        <div className="signIn-text mb-1 flex-column-center">
          <h3 className="h-1" style={fontWeight(500)}>
            Welcome to TCA! 👋
          </h3>
          <p style={fontWeight(400)} className="mt-1 mb-1">
            Please Sign up 
          </p>
        </div>
        <div className="signInButton-container width-100">
        </div>
        <div className="signInButton-container width-100">
          <a
            href="/sign-in"
            className="mt-1 bg-cyan color-white flex-center width-100 sign-in-btn"
            style={fontWeight(500)}
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
