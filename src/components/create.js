import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./create.css";

export default function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const sendDataToApi = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!name || !email || !dob || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const existingUsers = await axios.get(
        "https://676a644e863eaa5ac0de3551.mockapi.io/reglogin"
      );
      const emailExists = existingUsers.data.some(
        (user) => user.email === email
      );

      if (emailExists) {
        setError("Email already exists.");
        return;
      }

      await axios.post("https://676a644e863eaa5ac0de3551.mockapi.io/reglogin", {
        name,
        email,
        dob,
        password,
        confirmPassword,
      });
      setSuccessMessage("Registration successful!");
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      setError("Error submitting data. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form className="ui form">
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
          />
        </div>
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
          <label>Date of Birth</label>
          <input
            type="date"
            onChange={(e) => setDob(e.target.value)}
            value={dob}
          />
        </div>
        <div className="field">
          <label>Create Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>
        <div className="field">
          <label>Confirm Password</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm Password"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button className="ui button" onClick={sendDataToApi}>
          Register
        </button>
        <div className="already-registered">
          <p>Already registered?</p>
          <button
            className="ui button"
            type="button"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
