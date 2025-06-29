import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContent'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContent);

  const sendVerifyOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      console.log("backend url", backendUrl);

      const response = await axios.post(`${backendUrl}/api/auth/send-verify-otp`,{ Credentials: true });
      if (response.status === 200) {
        navigate('/email-verify');
        toast.success("OTP sent to your email. Please check your inbox.");
      } else {
        const message = response.data.message || "Logout failed. Please try again.";
        toast.error(message);
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
      const message = error.response?.data?.message || error.message || "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${backendUrl}/api/auth/logout`);
      if (response.status === 200) {
        setUserData(false);
        setIsLoggedIn(false);
        navigate('/');
      } else {
        const message = response.data.message || "Logout failed. Please try again.";
        toast.error(message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
      const message = error.response?.data?.message || error.message || "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 shadow-md'>
      <img src={assets.logo} alt="Logo" className='w-28 sm:w-32' />
      <div>
        {userData ?
          <div className='w-8 h-8 rounded-full bg-black text-white flex items-center justify-center relative group'>
              {userData.name[0].toUpperCase()}
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                  {!userData.isVerified && <li onClick={sendVerifyOtp} className='px-1 py-2 hover:bg-gray-300 cursor-pointer'>Verify email</li>}
                  <li onClick={logout} className='px-1 py-2 hover:bg-gray-300 cursor-pointer pr-10'>Logout</li>
                </ul>
              </div>
          </div>
          :
          <button onClick={() => navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800
          hover:bg-gray-200 transition-all'>Login <img src={assets.arrow_icon} alt="arrow icon" /></button>
        }
      </div>
    </div>
  );
};

export default Navbar;
