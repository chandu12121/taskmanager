import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProfileDetails from './components/ProfileDetails';

const App=()=> (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfileDetails />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );


export default App;