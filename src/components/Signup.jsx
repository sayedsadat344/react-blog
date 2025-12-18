import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'
import authService from '../appwrite/auth';
import { login } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");



    const signUp = async(data) =>{
        setError("");
        try {
            const userData =  await authService.createAccount(data);

            if(userData){

              console.log("User data: ",userData);
              
                const loggedInUser = authService.getCurrentUser();

                console.log("loggedInUser data: ",loggedInUser);

                if(loggedInUser){
                    dispatch(login(loggedInUser));

                    navigate("/");
                }
                
            }
        } catch (error) {

            console.log("Error: ",error?.message);
            
            setError(error?.message);
            throw error;
        }
        
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
    
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-slate-800">
                Create an Account 🚀
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Join us and start sharing your ideas
              </p>
            </div>

            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    
            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit(signUp)}>
    
              {/* Name */}
              <div>

                <Input label="Full Name" placeholder="Enter your full name" {...register("name",{
                    required:true
                })} />

               
              </div>
    
              {/* Email */}
              <div>

              <Input type="email" label="Email Address" placeholder="Enter your email address" {...register("email",{
                    required:true
                })}/>


            
              </div>
    
              {/* Password */}
              <div>

              <Input type="password" label="Password" placeholder="Enter your password" {...register("password",{
                    required:true
                })}/>


        
              </div>
    
              {/* Submit Button */}

              <Button type='submit' classes='w-full bg-indigo-600 text-white hover:bg-indigo-700 transition'> Sign Up</Button>
             
            </form>
    
            {/* Footer */}
            <p className="text-center text-sm text-slate-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
  )
}

export default Signup