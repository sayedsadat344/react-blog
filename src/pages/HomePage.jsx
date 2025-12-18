import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux' // Added
import { Link } from 'react-router-dom' // Added for navigation


import dbService from '../appwrite/db'
import { Container, PostCard } from '../components'

function HomePage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true) // Added loading state
    const [error, setError] = useState(null) // Added error state

    // Get authentication status from Redux
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        const fetchPosts = async () => {
            try {

                setError(null)

                // Check if user is authenticated before fetching posts
                if (authStatus) {
                    const res = await dbService.getAllPostsByQuery([])

                    if (res && res.documents) {
                        setPosts(res.documents)
                    } else {
                        setPosts([]) // Set empty array if no posts
                    }
                } else {
                    setPosts([]) // Empty posts if not authenticated
                }
            } catch (error) {
                console.error('Error fetching posts:', error)
                setError('Failed to load posts. Please try again later.')
                setPosts([])
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [authStatus]) // Added authStatus as dependency

    // Show loading state
    if (loading) {
        return (
            <div className="w-full py-16 text-center">
                <Container>
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                    <p className="mt-4 text-gray-600">Loading posts...</p>
                </Container>
            </div>
        )
    }

    // Show error state
    if (error) {
        return (
            <div className="w-full py-16 text-center">
                <Container>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                        <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Try Again
                        </button>
                    </div>
                </Container>
            </div>
        )
    }

    // If user is not authenticated, show login prompt
    if (!authStatus) {
        return (
            <div className="w-full py-16 text-center">
                <Container>
                    <div className="max-w-lg mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                Welcome to the Blog
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Join our community to read, share, and discuss amazing articles on various topics.
                            </p>
                            <div className="space-y-4">
                                <p className="text-gray-700">
                                    Please login to read and interact with posts.
                                </p>
                                <div className="flex justify-center space-x-4">

                                    <Link
                                        to="/test-redux"
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                                    >
                                        Test Redux
                                    </Link>

                                    <Link
                                        to="/login"
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // If authenticated but no posts
    if (posts.length === 0) {
        return (
            <div className="w-full py-16 text-center">
                <Container>
                    <div className="max-w-lg mx-auto">
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                No Posts Available
                            </h2>
                            <p className="text-gray-600 mb-6">
                                There are no posts to display. Be the first to create one!
                            </p>
                            <Link
                                to="/add-post"
                                className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Create Your First Post
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // Show posts if authenticated and posts exist
    return (
        <div className="w-full py-8">
            <Container>
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Latest Posts
                        </h1>
                        <Link
                            to="/add-post"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            New Post
                        </Link>
                    </div>
                    <p className="text-gray-600 mt-2">
                        Discover insightful articles from our community
                    </p>
                </div>

                <div className="flex flex-wrap -mx-2">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-6">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default HomePage