import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [ID, setID] = useState(null);
  const navigate = useNavigate();

  const sendDataToApi = (e) => {
    e.preventDefault();
    if (ID) {
      axios
        .put(`https://676a644e863eaa5ac0de3551.mockapi.io/reglogin/${ID}`, {
          name,
          email,
          dob,
        })
        .then((response) => {
          navigate("/read");
          console.log("Update successful:", response.data);
          alert("Data updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          alert("Failed to update data.");
        });
    } else {
      alert("Invalid ID. Cannot update.");
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("ID");
    if (id) {
      setID(id);
      axios
        .get(`https://676a644e863eaa5ac0de3551.mockapi.io/reglogin/${id}`)
        .then((response) => {
          const { name, email, dob } = response.data;
          setName(name);
          setEmail(email);
          setDob(dob);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert("Failed to fetch data.");
        });
    } else {
      navigate("/read");
    }
  }, [navigate]);

  return (
    <form className="ui form">
      <div className="field">
        <label style={{ display: "block", marginBottom: "8px" }}>Name</label>
        <input
          type="text"
          name="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>
      <div className="field">
        <label style={{ display: "block", marginBottom: "8px" }}>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div className="field">
        <label style={{ display: "block", marginBottom: "8px" }}>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      <button className="ui button" type="submit" onClick={sendDataToApi}>
        Update
      </button>
    </form>
  );
}
