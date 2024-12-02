import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as onHandleLogin } from '../authMethods'
import LoginLayout from '../layouts/Auth';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await onHandleLogin(email, password);
      navigate('/');
    } catch (error) {
      setNotice("Login failed: " + error.message);
    }
  };

  return (
    <LoginLayout>
      <h2>Welcome back</h2>
      <span>
        Do not have an account?&nbsp;
        <a href="/signup">Create an account</a>
      </span>
      <form onSubmit={handleLogin}>
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className='btn' type="submit">Sign in</button>
        {notice && <p>{notice}</p>}
      </form>
    </LoginLayout>
  );
};

export default Login;