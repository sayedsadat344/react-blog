import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components";
import parse from "html-react-parser";
import dbService from "../appwrite/db";
import { removePost } from "../store/postSlice";

function PostRead() {
 

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.userData);

  const [post, setPost] = useState(null);
  const [imageUrl,setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);


  const dispatch = useDispatch();

  const { slug } = useParams();
  const isAuthor = post && user && post.userId === user.$id;

  useEffect(() => {
    if (!slug) return;
  
    setLoading(true);
  
    dbService.getPostBySlug(slug)
      .then((response) => {
        if (!response) {
          navigate("/");
          return;
        }
  
        setPost(response);
  
        // ✅ fetch image AFTER post exists
        if (response.featuredImage) {
          return dbService.getFilePreview(response.featuredImage);
        }
      })
      .then((image) => {
        if (image) {
          setImageUrl(image);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  
  }, [slug, navigate]);
  



  const deletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    await dbService.deletePost(post.$id);
    await dbService.deleteFile(post.featuredImage);

    dispatch(removePost(post));

    navigate("/");
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-slate-500">
        Loading post...
      </div>
    );
  }

  if (!post) return null;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {post.title}
        </h1>

        <p className="text-sm text-slate-500">
          Posted on {new Date(post.$createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Author Actions */}
      {isAuthor && (
        <div className="flex gap-3 mb-6">
          <Link to={`/edit-post/${post.$id}`}>
            <Button>Edit</Button>
          </Link>

          <Button
            classes="bg-red-600 hover:bg-red-700"
            onClick={deletePost}
          >
            Delete
          </Button>
        </div>
      )}

      {/* Featured Image */}
      <div className="mb-8">


        <img
          src={imageUrl}
          alt={post.title}
          className="w-full rounded-xl shadow-md"
        />
      </div>

      {/* Content */}
      <article className="prose max-w-none prose-indigo">
        {parse(post.content)}
      </article>

    </main>
  );
}

export default PostRead;
