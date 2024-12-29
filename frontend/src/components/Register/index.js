import React, { useState } from 'react';
import axios from 'axios';
import {Link,useNavigate} from "react-router-dom"


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigator=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5004/api/auth/register', { username, email, password });
      navigator("/home")
      alert('Registration successful');
      

    } catch (err) {
      alert('Error registering');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
      <Link to="/">Login</Link>
    </form>
  );
};

export default Register;
