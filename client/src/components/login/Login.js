import React from 'react';
import './Login.css';

function Login() {
  return(
    <div className="login-wrapper">
      <h1>Welcome!</h1>
      <form id="form-login">
        <label>
          <p>Email Address</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div className = "login-buttons">
          <button type="submit" id="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;