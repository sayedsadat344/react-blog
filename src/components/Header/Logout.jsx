import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function Logout({classes}) {


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = () => {

    authService.logout().then(() => {
      dispatch(logout());
    });

    navigate("/");
  }

  return (
    <Link
      onClick={logoutHandler}
      className={classes}
    >
      Logout
    </Link>
  )
}

export default Logout