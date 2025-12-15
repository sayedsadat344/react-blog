
import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Link, Outlet } from 'react-router-dom';


function App() {


  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();



  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login(userData));
      } else {
        dispatch(logout());
      }
    }).finally(() => setLoading(false));
  }, []);



  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <Header />

      {!loading ? (
        <>
          {/* User Section */}
          <section className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">

              <div>
                <p className="font-semibold">Welcome back, Alex 👋</p>
                <p className="text-sm text-slate-500">Sharing ideas & stories</p>
              </div>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
              New Post
            </button>
          </section>


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
              <form className="space-y-5">

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Log In
                </button>
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
          </div>


          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role
            </label>

            <select
              className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Main content */}
          <main className="flex-grow max-w-7xl mx-auto px-6 pb-16 w-full">
            <section
              className="bg-white rounded-xl p-6 mb-10 flex flex-col"
              style={{
                transform: 'rotate(360deg)',
                fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", monospace',
                fontSize: '15px',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundImage:
                  'linear-gradient(90deg, rgba(0, 0, 0, 1) 16%, rgba(255, 255, 255, 1) 100%)',
                boxShadow:
                  '0px 4px 12px rgba(0, 0, 0, 0.15), 0px 4px 12px rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <span className="text-xs text-indigo-600 font-semibold">FEATURED</span>
              <h2 className="text-2xl font-bold mt-2 mb-3">
                Designing Calm & Productive Web Experiences
              </h2>
              <p className="text-slate-600 mb-4">
                Learn how color, spacing, and typography can dramatically improve user experience.
              </p>
              <a href="#" className="text-indigo-600 font-medium hover:underline">
                Read more →
              </a>
            </section>
          </main>
        </>
      ) : (

        <div className="max-w-xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Login to see the articles
          </h2>
          <p className="text-slate-600 mb-4">
            It looks like you are not logged in, kindly login to see the articles.
          </p>
          <a href="#" className="text-indigo-600 font-medium hover:underline">
            Login →
          </a>
        </div>
      )}



      <Footer />

    </div>

  )


}

export default App
