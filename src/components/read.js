import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './read.css';

export default function Read() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios.get("https://676a644e863eaa5ac0de3551.mockapi.io/reglogin")
      .then((getData) => {
        setApiData(getData.data);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const setID = (id) => {
    console.log(id);
    localStorage.setItem("ID", id);
  };

  const onDelete = (id) => {
    axios.delete(`https://676a644e863eaa5ac0de3551.mockapi.io/reglogin/${id}`)
      .then(() => {
        setApiData(apiData.filter((data) => data.id !== id));
      }).catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <div>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Serial Num</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.dob}</td>
                <td>
                  <Link to="/update">
                    <button onClick={() => setID(data.id)}>Update</button>
                  </Link>
                </td>
                <td>
                  <button onClick={() => onDelete(data.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
