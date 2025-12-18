import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../store/authSlice'


export default function TestRedux() {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)
    const dispatch = useDispatch()
    
    console.log('TestRedux - authStatus:', authStatus)
    console.log('TestRedux - userData:', userData)
    
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Redux State Test</h1>
            <div className="mb-4 p-4 bg-gray-100 rounded">
                <p><strong>Auth Status:</strong> {authStatus ? 'TRUE (Logged in)' : 'FALSE (Not logged in)'}</p>
                <p><strong>User Data:</strong> {JSON.stringify(userData)}</p>
            </div>
            
            <div className="space-x-4">
                <button 
                    onClick={() => dispatch(login({ userData: { id: 1, name: 'Test User' } }))}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Dispatch Login
                </button>
                <button 
                    onClick={() => dispatch(logout())}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                >
                    Dispatch Logout
                </button>
            </div>
        </div>
    )
}