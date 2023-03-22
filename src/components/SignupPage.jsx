import React, { useState } from "react";
import "../styles/LoginPage.scss";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { BiErrorCircle } from "react-icons/bi";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup, error, setError } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirmPassword && password)
      return setError("Confirm Password field Empty");

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setError("Passwords do not match");
      return;
    }
    await signup(email, password);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-page">
      <div className="signin">
        <div className="content">
          <h2>Sign up</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputbox">
              <input
                type="text"
                value={email}
                className={email.length > 0 ? "lift" : ""}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i>Email</i>
            </div>
            <div className="inputbox">
              <input
                type="password"
                value={password}
                className={password.length > 0 ? "lift" : ""}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i>Password</i>
            </div>
            <div className="inputbox">
              <input
                type="password"
                value={confirmPassword}
                className={confirmPassword.length > 0 ? "lift" : ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i>Confirm Password</i>
            </div>
            <div className="links">
              <Link to="/login">Have an account? Log in</Link>
            </div>
            <div className="inputbox">
              <button type="submit">SIGNUP</button>
              {error && (
                <div className="error">
                  <BiErrorCircle size={25} />
                  {error}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
