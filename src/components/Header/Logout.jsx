import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function Logout() {


    const dispatch = useDispatch();

    const logoutHandler  =() =>{
        authService.logout().then(() =>{
            this.dispatch(logout());
        });
    }

  return (
    <Link
     onClick={logoutHandler}
    className="block px-4 py-2 text-sm text-gray-800 hover:bg-slate-100"
  >
    Logout
  </Link>
  )
}

export default Logout