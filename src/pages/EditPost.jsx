import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import dbService from '../appwrite/db';

function EditPost() {


    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (slug) {
            dbService.getPostBySlug(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            }).finally(() => {
                console.log("Something");

                

            });




        } else {
            navigate("/")
        }
    }, [slug, navigate]);

    return (
        <div>

            <Container>
                <PostForm post={post} />
            </Container>

        </div>
    )
}

export default EditPost