import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { AppContent } from '../context/AppContent'
import { toast } from 'react-toastify'


const ResetPassword = () => {

  axios.defaults.withCredentials = true;
  const { backendUrl } = useContext(AppContent);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [isEmailSent, setisEmailSent] = useState(false);
  const [otp, setotp] = useState(0);
  const [isOtpSubmited, setisOtpSubmited] = useState(false);

  const inputRefs = React.useRef([]);

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

  const onSubmitEmail = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, {email});
      if (response.status === 200) {
        setisEmailSent(true);
        toast.success("OTP sent to your email successfully!");
      } else {
        const message = response.data.message || "Failed to send OTP. Please try again.";
        toast.error(message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      const message = error.response?.data?.message || error.message || "Something went wrong. Please try again.";
      toast.error(message);
      
    }
  }

  const onSubmitOtp = async (e) => {
    try {
      e.preventDefault();
      const otpValue = inputRefs.current.map(input => input.value).join('');
      setotp(otpValue);
      setisOtpSubmited(true);
    } catch (error) {
      console.error("Error submitting OTP:", error);
      const message = error.response?.data?.message || error.message || "Something went wrong. Please try again.";
      toast.error(message);
      
    }
  }

  const onSubmitNewPassword = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,
        otp,
        newPassword
      });
      if (response.status === 200) {
        toast.success("Password reset successfully!");
        navigate('/login');
      } else {
        const message = response.data.message || "Failed to reset password. Please try again.";
        toast.error(message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      const message = error.response?.data?.message || error.message || "Something went wrong. Please try again.";
      toast.error(message);
      
    }
  }

  return (
    <div>
      <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
        <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className='absolute left-5 sm:left-20 top-5 w-28 sm:32 cursor-pointer' />

        {/* Email id Form */}

        {!isEmailSent &&
          <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
            <p className='text-indigo-300 text-xs mb-6 text-center'>Enter your Registerd Email address</p>
            <div className='flex gap-3 mb-4 items-center w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <img src={assets.mail_icon} alt="Mail Icon" className='w-3 h-3' />
              <input type="email" placeholder='Email Id'
                className='bg-transparent outline-none text-white w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <button className='w-full bg-gradient-to-r from-indigo-500 to-indigo-900 hover:bg-indigo-700 transition-all
              text-white font-semibold py-2.5 rounded-full mb-4'>Submit</button>
          </form>}


        {/* OTP Form */}

        {!isOtpSubmited && isEmailSent &&
          <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
            <p className='text-indigo-300 text-xs mb-6 text-center'>Please enter the OTP sent to your email to reset password.</p>
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
         text-white font-semibold py-2.5 rounded-full mb-4'>Submit</button>
          </form>

        }

        {/* New Password */}

        {isOtpSubmited && isEmailSent &&
          <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
            <p className='text-indigo-300 text-xs mb-6 text-center'>Enter the new password below</p>
            <div className='flex gap-3 mb-4 items-center w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <img src={assets.lock_icon} alt="Mail Icon" className='w-3 h-3' />
              <input type="password" placeholder='Password'
                className='bg-transparent outline-none text-white'
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                required />
            </div>
            <button className='w-full bg-gradient-to-r from-indigo-500 to-indigo-900 hover:bg-indigo-700 transition-all
           text-white font-semibold py-2.5 rounded-full mb-4'>Submit</button>
          </form>
        }

      </div>
    </div>
  )
}

export default ResetPassword