import React from 'react'
import { useState, useContext } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContent';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    
    const {backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);
    const [state, setState] = useState("Sign Up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const onSubitHandler = async (e) => {
        try {
            e.preventDefault();

            axios.defaults.withCredentials = true;
            if (state === 'Sign Up') {
                const response = await axios.post(`${backendUrl}/api/auth/register`, {
                    name,
                    email,
                    password
                });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                    getUserData();
                    navigate('/');
                } else {
                    toast.error(response.data.message || "Registration failed. Please try again.");
                }
            }
            else if (state === 'Login') {
                const response = await axios.post(`${backendUrl}/api/auth/login`, {
                    email,
                    password
                });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                    getUserData();
                    navigate('/');
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.error("Registration/Login Error:", error);

            const message =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong. Please try again.";

            toast.error(message);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
            <img onClick={()=> navigate('/')} src={assets.logo} alt="Logo" className='absolute left-5 sm:left-20 top-5 w-28 sm:32 cursor-pointer' />
            <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
                <h1 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h1>
                <form onSubmit={onSubitHandler}  >
                    {state === 'Sign Up' && (
                        <div className='flex gap-3 mb-4 items-center w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                            <img src={assets.person_icon} alt="Person Icon" />
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text" placeholder='Enter your name'
                                className='w-full bg-transparent text-white outline-none' />
                        </div>
                    )}
                    <div className='flex gap-3 mb-4 items-center w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img src={assets.mail_icon} alt="Email Icon" />
                        <input type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder='Email Id' 
                            className='w-full bg-transparent text-white outline-none' />
                    </div>
                    <div className='flex gap-3 mb-4 items-center w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img src={assets.lock_icon} alt="Password Icon" />
                        <input type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder='Password' 
                            className='w-full bg-transparent text-white outline-none' />
                    </div>
                    <p onClick={()=> navigate('/reset-password')}className='mb-4 text-indigo-500 cursor-pointer'>
                        Forget Password?
                    </p>
                    <button className='w-full bg-gradient-to-r from-indigo-500 to-indigo-900 hover:bg-indigo-700 transition-all text-white font-semibold py-2.5 rounded-full mb-4'>
                        {state}
                    </button>

                    {state === 'Sign Up' ? (
                        <p className='text-center text-gray-400 text-xs mt-4'>Already have an account?{' '}
                            <span onClick={() => setState('Login')} className='text-blue-400 underline cursor-pointer'>Login here</span></p>
                    ) : (
                        <p className='text-center text-gray-400 text-xs mt-4'>Don't have an account?{' '}
                            <span onClick={() => setState('Sign Up')} className='text-blue-400 underline cursor-pointer'>Sign Up</span></p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login