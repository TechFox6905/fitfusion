import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContentProvider = (props) => {
  
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      
      const response = await axios.get(
        `${backendUrl}/api/auth/is-auth`
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
        getUserData();
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking authentication state:", error);
      toast.error(error.response?.data?.message || error.message);
      setIsLoggedIn(false);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUserData(response.data);
      } else {
        toast.error(response.data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };  

  useEffect(() => {
    const timer = setTimeout(() => getAuthState(), 10); // 10ms delay
    return () => clearTimeout(timer);
  }, []);
  

  const value = {
    backendUrl,
    isLoggedIn, setIsLoggedIn,
    userData, setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
