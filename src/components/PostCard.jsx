import React from 'react'
import { Link } from 'react-router-dom'
import dbService from '../appwrite/db'



function PostCard({
    $id, title, featuredImage
}) {
    return (
        <Link  to={`/post/${$id}`}>
            <div className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl 
                 transition transform hover:-translate-y-1'>

                {/* Image */}
                <img
                    src={dbService.getFilePreview(featuredImage)}
                    alt={title}
                    className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-5 flex flex-col h-full">
                    <span className="text-xs text-indigo-600 font-semibold uppercase">
                        Post #{id}
                    </span>

                    <h2 className="text-lg font-bold text-slate-800 mt-2 line-clamp-2">
                        {title}
                    </h2>

                    <Link
                        to={`/post/${$id}`}
                        className="mt-4 inline-block text-indigo-600 font-medium hover:underline"
                    >
                        Read more →
                    </Link>
                </div>

            </div>
        </Link>
    )
}

export default PostCard