import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'

import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import PostList from './pages/PostList.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import PostRead from './pages/PostRead.jsx'
import AuthGuard from './components/AuthGuard.jsx'
import TestRedux from './components/TestRedux.jsx'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },

            {
                path: "/test-redux",
                element: <TestRedux />,
            }
            ,
            {
                path: "/login",
                element: (
                    <AuthGuard authentication={false}>
                        <LoginPage />
                     </AuthGuard>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthGuard authentication={false}>
                        <SignupPage />
                    </AuthGuard>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <AuthGuard authentication>
                        {" "}
                        <PostList />
                    </AuthGuard>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <AuthGuard authentication>
                        {" "}
                        <AddPost />
                    </AuthGuard>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <AuthGuard authentication>
                        {" "}
                        <EditPost />
                    </AuthGuard>
                ),
            },
            {
                path: "/post/:slug",
                element: <PostRead />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider>
    </React.StrictMode>,
  )