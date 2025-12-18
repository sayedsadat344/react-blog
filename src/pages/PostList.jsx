import React, { useEffect, useState } from 'react'
import dbService from '../appwrite/db';
import { Container, PostCard } from '../components';

function PostList() {

    const [postList,setPostList] = useState([])
    useEffect(() =>{
            dbService.getAllPostsByQuery([]).then((res) => {

                if(res){
                    setPostList(res.documents);
                }
               
            }).catch((error) => {
                throw error;
            });
    },[]);

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