import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const res = await fetch('/logout', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.status === 200) {
          dispatch({ type: 'USER', payload: false });
          navigate('/login', { replace: true });
        } else {
          console.error('Logout failed:', res.statusText);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return (
    <>
      <h1>Logout page</h1>
    </>
  );
};

export default Logout;
