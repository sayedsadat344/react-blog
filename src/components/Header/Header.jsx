import { useState } from "react";

import { Logout, Logo, Container, Button } from '../index'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Header() {
  const [open, setOpen] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Posts",
      slug: "/all-posts",
      active: authStatus
    },

    {
      name: "About",
      slug: "/about",
      active: authStatus
    },



  ];

  return (
    <header className="bg-gradient-to-r from-gray-700 to-red-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold">CoolBlog</h1>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">

          {
            navItems.map((item) => item.active ? (
              <Link key={item.name} to={item.slug} className="hover:text-slate-200" >{item.name}</Link>
            ) : null)
          }

          {/* <Link to="#" className="hover:text-slate-200">Home</Link>
          <Link to="#" className="hover:text-slate-200">Articles</Link>
          <Link to="#" className="hover:text-slate-200">About</Link> */}
        </nav>

        {/* User Dropdown */}

        {
          authStatus ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center space-x-2 rounded-full px-2 py-1 hover:bg-slate-100 transition focus:outline-none"
              >
                <Logo />
                <span className="hidden sm:block text-sm font-medium">Alex</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-44 bg-white text-slate-700 rounded-xl shadow-lg overflow-hidden z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-slate-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-slate-100"
                  >
                    Dashboard
                  </Link>
                  <hr />
                  <Logout />
                </div>
              )}
            </div>
          ) : (
            /* Auth buttons (right aligned & side by side) */
            <div className="flex items-center space-x-3">

              <Button classes="border border-slate-400 text-white hover:bg-slate-100 hover:text-gray-500 transition" onClick={() => navigate('/login')}>Log In</Button>

              <Button classes="bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm" onClick={() => navigate('/signup')}> Sign Up</Button>
              {/* <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium rounded-lg  border border-slate-400 text-white hover:bg-slate-100 hover:text-gray-500 transition"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm"
              >
                Sign Up
              </Link> */}
            </div>
          )
        }




      </div>
    </header>
  );
}
