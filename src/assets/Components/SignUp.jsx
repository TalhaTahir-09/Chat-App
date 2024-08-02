import { useEffect } from 'react';
import { fontWeight, passwordShower } from '../index.js'

function SignIn() {

  return (
    <div className="flex-center width-100 height-100">
      <div className="flex-column-center sign-in-container border-radius-20px">
        <div className="signIn-text mb-3 flex-column-center">
          <h3 className="h-1" style={fontWeight(500)}>
            Sign Up
          </h3>
          <p style={fontWeight(400)}>Hi👋 Welcome To TCA</p>
        </div>
        <div className="email-password-container width-100 flex-start flex-column">
          <label htmlFor="name-input">
            <h4 style={fontWeight(600)}>UserName</h4>
          </label>
          <input
            type="name"
            id="email-input"
            className="border-radius-20px p-1 input mt-1 mb-1"
            placeholder="example@gmail.com"
          />
           <label htmlFor="email-input">
            <h4 style={fontWeight(600)}>Email</h4>
          </label>
          <input
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
            className="border-radius-20px p-1 input mt-1 mb-1 password-input"
            placeholder="**********"
          />
          <button className='absolute-center eye-btn' onClick={()=> {passwordShower("password-shower", "password-input")}}><i className='bx bx-hide h-4 password-shower' id='password-shower'></i></button>
          </div>
           <label htmlFor="cPassword-input">
            <h4 style={fontWeight(600)}>Current Password</h4>
          </label>
          <div className="password-eye position-relative width-100 ">
          <input
            id="cPassword-input"
            type="password"
            className="border-radius-20px p-1 input mt-1 mb-1 password-input"
            placeholder="**********"
          />
          <button className='absolute-center eye-btn' onClick={() => {passwordShower("cPassword-shower", "cPassword-input")}}><i className='bx bx-hide h-4 password-shower' id='cPassword-shower'></i></button>
          </div>
         
        </div>
      
        <div className="signInButton-container width-100">
          <button className="mt-1 bg-cyan color-white flex-center width-100 sign-in-btn" style={fontWeight(500)}>Sign In</button>
        </div>
        <a
          className={`flex-center mt-3`}
          style={fontWeight(100)}
          href='/sign-in'
        > 
          <p className="p-4  color-cyan " style={fontWeight(600)}>Already Have An Account?</p>
        </a>
      </div>
    </div>
  );

}
export default SignIn;
