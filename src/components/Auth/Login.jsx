import React, { useState } from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'; 
import { useForm } from 'react-hook-form';

import { login as authLogin } from '../../store/authSlice';


import authService from '../../appwrite/auth';
import Input from '../Elements/Input';
import Button from '../Elements/Button';

function Login() {
    console.log("🚀 Login component RENDERED");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);



    const login = async (data) => {
        console.log("📝 Data in login: ", data);

        setError("");
        try {
        
            const session = await authService.login(data);

            console.log("👤 session:", session);

            if (session) {

                const token = await authService.getJWT();

                console.log("👤 token:", token);

                localStorage.setItem("auth_token",token.jwt);

                const userData = await authService.getCurrentUser();
                console.log("👤 User data received:", userData);

                if (userData) {
                    console.log("✅ Dispatching authLogin...");
                    dispatch(authLogin(userData));
                    console.log("✅ Navigating to /");
                    navigate("/");
                }
            }

        } catch (error) {
            console.log("❌ Login Error: ", error);
            setError(error.message || "Login failed");
        }
    }


    

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Welcome Back 👋
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Please login to your account
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit(login)}>

                    {/* Email Input */}
                    <div>
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                    </div>

                    {/* Login Button */}
                    <Button
                        type='submit'
                        classes='w-full bg-indigo-600 text-white hover:bg-indigo-700 transition'
                    >
                        Log In
                    </Button>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-slate-600 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Error Display */}
                {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                        <p className='text-red-600 text-sm text-center'>{error}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login