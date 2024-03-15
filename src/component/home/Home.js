import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../../../my-react-auth-app/src/component/nav/NavigationBar';
function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <>
      <Nav />
    </>
  );
}

export default Home;
