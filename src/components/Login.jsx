import React, { useState } from 'react'
import Input, { Button } from './index'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { login as authLogin } from '../store/authSlice';
import { logout } from '../store/authSlice';

function Login() {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);


    const login = async () => {
        setError("");
        try {
            const session = await authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();
                if(userData) {
                    this.dispatch(authLogin(userData));
                    this.navigate("/");
                }else{
                    this.dispatch(logout());
                }
            }

        } catch (error) {
            setError(error);
            console.log("Error: ", error);

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

                    {/* Username */}
                    <div>
                        <Input type="email" label="Username" placeholder="Enter your username" {...register("email",{
                            required:true,
                            validate:{
                                matchPattern: (value) => /[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/.test(value) ||
                                "Email address must be valid!",
                            }
                        })} />
                    </div>

                    {/* Password */}
                    <div>
                        <Input type="password" label="Password" placeholder="Enter your password" {...register("password",{
                            required:true,
                        })}/>
                    </div>

                    {/* Login Button */}

                    <Button type='submit' classes='w-full bg-indigo-600 text-white  hover:bg-indigo-700 transition'>
                        Log In
                    </Button>


                </form>

                {/* Footer */}
                <p className="text-center text-sm text-slate-600 mt-6">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>


            {error && <p className='text-red-500 text-center'>{error}</p>}
        </div>

    )
}

export default Login