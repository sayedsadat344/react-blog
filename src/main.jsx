import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PROTECTED_ROUTES, UN_PROTECTED_ROUTES } from './config/Routes.jsx'
import NotFound from './components/NotFound.jsx'




const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
     
        children: [
            ...UN_PROTECTED_ROUTES,
            ...PROTECTED_ROUTES,
          ],
    },

    {
        path: '*',
        element: <NotFound />,
      },

    //   {
    //     path: '*',
    //     element: <Navigate to="/" replace />,
    //   },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider>
    </React.StrictMode>,
  )