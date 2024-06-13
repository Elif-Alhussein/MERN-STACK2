import { useState, useEffect } from "react";
import Axios from "axios";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const api = "http://localhost:3001";
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    Axios.get(`${api}/users`).then((res) => {
      setUsers(res.data);
    });
  }, [users]);

  const createUser = () => {
    if (name && age && email) {
      Axios.post(`${api}/createUser`, {
        name,
        age,
        email,
      }).then((res) => {
        setUsers([...users, res.data]);
        setName("");
        setAge("");
        setEmail("");
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="create-user-container d-flex justify-content-center">
        <input
          type="text"
          className="form-control"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          value={age}
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="email"
          className="form-control"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" className="btn" onClick={createUser}>
          Create User
        </button>
      </div>
      <div className="user-list mt-4">
        {users.map(({ _id, name, age, email }) => (
          <div key={_id} className="card-user position-relative">
            <h5>Name: {name}</h5>
            <p>Email: {email}</p>
            <div className="age-badge">{age}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
