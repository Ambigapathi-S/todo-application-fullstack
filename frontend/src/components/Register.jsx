import React, { useState } from 'react';
import { registerAPICall } from "../service/AuthService";

const Register = () => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegisterForm(e) {
    e.preventDefault();

    const register = { name, username, email, password };

    try {
      const response = await registerAPICall(register);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="formUI">
      <h1 className="fs-4 text-center fw-bold">Register</h1>
      <form>
        <div className="form-group mt-3">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name" value={name} id="title" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" name="username" value={username} id="description" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" name="email" value={email} id="title" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input type="text" className="form-control" name="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-group text-center mt-5">
          <button className="btn btn-primary" onClick={(e) => handleRegisterForm(e)}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Register