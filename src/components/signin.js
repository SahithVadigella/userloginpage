import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const response = await axios.get(
        "https://676a644e863eaa5ac0de3551.mockapi.io/reglogin"
      );
      const user = response.data.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        alert("Login successful!");
        navigate("/read");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError("Error while logging in. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form className="ui form">
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button className="ui button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
}
