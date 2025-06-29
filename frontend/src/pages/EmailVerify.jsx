import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { useContext } from 'react'
import { AppContent } from '../context/AppContent'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EmailVerify = () => {

  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContent);
  const inputRefs = React.useRef([]);
  const navigate = useNavigate();

  const handelInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handelKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && e.target.value.length === 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handelPaste = (e) => {
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    pastedData.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
        inputRefs.current[index].dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    inputRefs.current[pastedData.length - 1].focus();
  }

  const onSumbitHandler = async (e) => {
    try {
      e.preventDefault();
      const otp = inputRefs.current.map(input => input.value).join('');

      const response = await axios.post(`${backendUrl}/api/auth/verify-account`, {otp});
      if (response.status === 200) {
        toast.success("Email verified successfully!");
        getUserData();
        navigate('/');
      } else {
        const message = response.data.message || "Verification failed. Please try again.";
        toast.error(message);
      }

    } catch (error) {
      console.error("Email verification error:", error);
      const message = error.response?.data?.message || error.message || "Something went wrong. Please try again.";
      toast.error(message);

    }
  }

  useEffect(() => {
    isLoggedIn && userData && userData.isVerified && navigate('/');
  }, [isLoggedIn, userData, navigate]);

  return (
    <div>
      <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
        <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className='absolute left-5 sm:left-20 top-5 w-28 sm:32 cursor-pointer' />
        <form onSubmit={onSumbitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
          <p className='text-indigo-300 text-xs mb-6 text-center'>Please enter the OTP sent to your email to verify your account.</p>
          <div className='flex items-center justify-between gap-2 mb-8' onPaste={handelPaste}>
            {Array(6).fill(0).map((_, index) => (
              <input type='text' maxLength={1} key={index} required
                className='w-12 h-12 bg-[#333A5C] text-center text-white text-xl rounded-md'
                ref={e => inputRefs.current[index] = e}
                onInput={(e) => handelInput(e, index)}
                onKeyDown={(e) => handelKeyDown(e, index)} />
            ))}
          </div>
          <button className='w-full bg-gradient-to-r from-indigo-500 to-indigo-900 hover:bg-indigo-700 transition-all
           text-white font-semibold py-2.5 rounded-full mb-4'>Verify Email</button>
        </form>
      </div>
    </div>
  )
}

export default EmailVerify