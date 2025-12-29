import React, { useEffect, useState } from 'react'
import dbService from '../appwrite/db';
import { Container, PostCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../store/postSlice';

function PostList() {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const cachedPosts = useSelector((state) => state.posts.list);
    const [postList, setPostList] = useState([])
    useEffect(() => {

        setError(null)

        if (cachedPosts.length == 0) {
            dbService.getAllPostsByQuery([]).then((res) => {
                if (res) {

                    dispatch(setPosts(res.documents));
                    setPostList(res.documents);
                }

            }).catch((error) => {
                setError(error.message || "API error !")
                throw error;
            });
        } else {
            setPostList(cachedPosts);
          
        }


        setLoading(false)

    }, []);


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



    return (
        <div className="w-full py-8">
            <Container>
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            All Posts
                        </h1>

                    </div>
                    <p className="text-gray-600 mt-2">
                        See all the posts
                    </p>
                </div>

                <div className="flex flex-wrap -mx-2">
                    {postList.map((post) => (
                        <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-6">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default PostList