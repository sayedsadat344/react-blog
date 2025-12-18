import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, RTE, Select } from '../index'
import dbService from '../../appwrite/db';

function PostForm({ post }) {



    const [imageUrl, setImageUrl] = useState(null);
    const [localPreview, setLocalPreview] = useState(null);

    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!post || !post.featuredImage) return;

        dbService
            .getFilePreview(post.featuredImage)
            .then((image) => {
                setImageUrl(image);
            })
            .catch(console.error);

    }, [post]);


    useEffect(() => {
        return () => {
            if (localPreview) {
                URL.revokeObjectURL(localPreview);
            }
        };
    }, [localPreview]);


    const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            featuredImage: post?.featuredImage || ''
        },
    });





    const createPost = async (data) => {
        setError(null);

        if (post) {
            try {

                let featuredImageId = post?.featuredImage;

                console.log("data.image && data.image.length > 0 : ", (data.image && data.image.length > 0));


                console.log("data: ", data);
                console.log("data.image: ", data.image);
                // console.log("data.image[0]: ",data.image[0]);





                if (data.image && data.image.length > 0) {
                    const uploaded = await dbService.uploadFile(data.image[0]);
                    featuredImageId = uploaded.$id;

                    console.log("The featured image 2: ", featuredImageId);

                    if (post?.featuredImage) {
                        await dbService.deleteFile(post.featuredImage);
                    }
                }


                const updatePost = await dbService.updatePost(post.$id, {
                    title: data.title,
                    content: data.content,
                    status: data.status,
                    featuredImage: featuredImageId,
                });

                if (updatePost) {
                    navigate(`/post/${updatePost.$id}`);
                }


            } catch (error) {
                setError(error.message || "Update failed");
            }

        } else {

            const postImage = data.image[0] ? await dbService.uploadFile(data.image[0]) : null;

            try {

                data.featuredImage = postImage?.$id;
                const createdPost = await dbService.createPost({
                    ...data,
                    userId: userData?.$id
                });

                navigate(`/post/${createdPost.$id}`);
            } catch (err) {
                setError(err.message || "Something went wrong");
            }
        }


    };



    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);



    useEffect(() => {
        if (post) {
            reset({
                title: post.title || "",
                slug: post.$id || "",
                content: post.content || "",
                status: post.status || "active",
                featuredImage: post.featuredImage || ""
            });
        }
    }, [post, reset]);


    useEffect(() => {

        const subsription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, {
                    shouldValidate: true
                }))
            }
        });
        return () => subsription.unsubscribe();
    }, [watch, setError, slugTransform, setValue]);

    const statusOptions = [
        {
            name: "Active",
            value: "active"
        },

        {
            name: "InActive",
            value: "inActive"
        },
    ];

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full  bg-white rounded-2xl shadow-lg p-8">


                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Create New Post ✍️
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Share your ideas with the world
                    </p>
                </div>




                {/* Error */}
                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </p>
                )}



                {/* Form */}
                <form onSubmit={handleSubmit(createPost)}>
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">

                        {/* LEFT COLUMN (2/3 width) */}
                        <div className="col-span-1 lg:col-span-3 space-y-5">
                            {/* Title */}
                            <Input
                                label="Title"
                                placeholder="Enter post title"
                                {...register("title", { required: true, maxLength: 255 })}
                            />

                            {/* Slug */}
                            <Input
                                label="Slug"
                                placeholder="Post slug"
                                {...register("slug", { required: true })}
                                onInput={(e) => {
                                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                }}
                            />

                            {/* Content */}
                            <RTE
                                label="Content"
                                name="content"
                                control={control}
                                defaultValue={getValues("content")}
                            />
                        </div>

                        {/* RIGHT COLUMN (1/3 width) */}
                        <div className="col-span-1 lg:col-span-3 space-y-5">
                            {/* Status */}
                            <Select options={statusOptions} label="Status" {...register("status")} />

                            {/* Featured Image */}
                            <Controller
                                name="image"
                                control={control}
                                rules={{ required: !post }}
                                render={({ field }) => (
                                    <Input
                                        label="Featured Image"
                                        type="file"
                                        accept="image/png, image/jpg, image/jpeg, image/gif"
                                        ref={field.ref}
                                        onChange={(e) => {
                                            const files = e.target.files;

                                            field.onChange(files); // ✅ RHF receives FileList

                                            if (files && files.length > 0) {
                                                const previewUrl = URL.createObjectURL(files[0]);
                                                setLocalPreview(previewUrl);
                                            }
                                        }}
                                    />
                                )}
                            />

                            {/* Image Preview */}
                            {(localPreview || imageUrl) && (
                                <div className="w-full">
                                    <img
                                        src={localPreview || imageUrl}
                                        alt={post?.title || "Preview"}
                                        className="rounded-lg object-cover"
                                    />
                                </div>
                            )}


                        </div>


                        {/* Submit Button */}
                        {/* Submit Button */}
                        <div className="col-span-2 lg:col-start-2 lg:col-span-4 flex justify-center mt-4">
                            <Button
                                type="submit"
                                classes="w-full max-w-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                            >
                                {post ? "Update Post" : "Create Post"}
                            </Button>
                        </div>


                    </div>

                </form>


            </div>
        </div>

    )
}

export default PostForm