import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup as onHandleSignup } from '../authMethods'
import LoginLayout from '../layouts/Auth';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await onHandleSignup(email, password);
      navigate('/login');
    } catch (error) {
      setNotice("Signup failed: " + error.message);
    }
  };

  return (
    <LoginLayout>
      <h2>Create an account</h2>
      <span>
        I already have an account&nbsp;
        <a href="/login">Sign in</a>
      </span>
      <form onSubmit={handleSignup}>
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className='btn' type="submit">Create an account</button>
        {notice && <p>{notice}</p>}
      </form>
    </LoginLayout>
  );
};

export default Signup;