import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './Profile';
import useAuth from './useAuth';
import './assets/style.scss';
import loadingSVG from './assets/images/loading.svg';
import MoviePage from './pages/MoviePage';

const App = () => {
  // const isAuthenticated = !!localStorage.getItem('token');
  const { user, loading } = useAuth();

  if (loading) {
    return <div className='loading-container'>
      <img src={loadingSVG} alt="Loading..." />
    </div>;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={user ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;