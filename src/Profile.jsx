import React from 'react';
import { auth } from './firebase';
// import { useNavigate } from 'react-router-dom';
// import { logout as onSignOut } from './authMethods'
import ProductList from './components/product/List';

const Profile = () => {
  // const navigate = useNavigate();
  const user = auth.currentUser ;

  // const handleLogout = async () => {
  //   try {
  //     await onSignOut();
  //     navigate('/login');
  //   } catch (error) {
  //     console.error("Logout failed: ", error);
  //   }
  // };

  if (!user) {
    return (
      <div>
        <h2>No user is logged in.</h2>
        <p>Please log in to see your profile.</p>
      </div>
    );
  }

  return (
    <div>
      {/* <h2>Welcome, {user.email}</h2> */}
      <ProductList />
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Profile;