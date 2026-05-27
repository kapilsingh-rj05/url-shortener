import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login, logout } from '../store/authSlice';

const VerifySession = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthSession = async () => {
      try {
        const response = await axios.get("/user/getUser");
        console.log("SERVER AUTH RESPONSE:", response.data);
        if (response.data.authenticated) {
          dispatch(login(response.data.user)); 
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log("CATCH BLOCK TRIGGERED:", error.response?.data || error.message);
        console.log("No valid session found.");
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkAuthSession();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-slate-500 font-sans">Verifying session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default VerifySession;