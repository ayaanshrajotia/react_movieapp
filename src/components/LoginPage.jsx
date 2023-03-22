import React from "react";
import "../styles/LoginPage.scss";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <div className="signin">
          <div className="content">
            <h2>Log In</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="inputbox">
                <input
                  type="email"
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
              <div className="links">
                <Link to="#">Forgot Password</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
              <div className="inputbox">
                <button type="submit" disabled={isLoading}>
                  LOGIN
                </button>
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
    </div>
  );
}

export default LoginPage;
