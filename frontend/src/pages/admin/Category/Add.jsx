import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { generateSlug } from '../../../library';
import { Context } from '../../../Context/Main';
import axios from "axios";
import { useSelector } from 'react-redux';
import store from '../../../store';
export default function Add() {
    const { API_BASE_URL, CATEGORY_URL, notify, } = useContext(Context);
    const nameRef = useRef();
    const slugRef = useRef();
    const admin = useSelector(store => store.admin)

    const getSlug = () => {
        const slug = generateSlug(nameRef.current.value);
        slugRef.current.value = slug;
    }


    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            setIsLoading(true);
            setUploadProgress(0);

            // Create a temporary URL for the image preview
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);

            // Simulating upload progress
            const simulateUpload = () => {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 10;
                    setUploadProgress(progress);
                    if (progress >= 100) {
                        clearInterval(interval);
                        setIsLoading(false);
                    }
                }, 300); // Simulated upload speed, adjust as needed
            };

            simulateUpload();
        }
    };

    const submitHandler = (e) => {
        e.preventDefault()
        if (e.target.category_image.files[0] == undefined) {
            notify("Please upload the image",0)
            return 
        }


        const formData = new FormData();
        formData.append("name", e.target.name.value.trim());
        formData.append("slug", slugRef.current.value);
        formData.append("category_image", e.target.category_image.files[0]);

        axios.post(
            API_BASE_URL + CATEGORY_URL + "/create",
            formData,
            {
                headers: {
                    Authorization: admin.token
                }
            }
            // {
            //     name: e.target.name.value.trim(),
            //     slug: slugRef.current.value,
            //     category_image: e.target.category_image.files[0]
            // }
        ).then(
            (success) => {
                if (success.data.status == 1) {
                    e.target.reset();
                    setSelectedImage(null);
                };
                notify(success.data.msg, success.data.status)
            }
        ).catch(
            (error) => {
                console.log(error);

            }
        )
    }

    return (
        <div className=' mt-5 '>
            <div className="flex px-8  py-5 justify-between items-center">
                <nav className="flex " aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <Link
                                to='/admin'
                                className="inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                            >
                                <svg
                                    className="w-3 h-3 me-2.5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg
                                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <Link
                                    to="/admin/category"
                                    className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Category
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg
                                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <Link
                                    className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Add
                                </Link>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>


            <div className="relative overflow-x-auto bg-white mx-8 my-5 shadow rounded-lg ">
                <div className='flex items-center px-8 py-3 mb-4 justify-between border-b-2 '>
                    <div className='text-xl font-[600] uppercase '>Add New Category</div>
                </div>
                {/* <h2 className="text-2xl font-bold mb-4">Add New Category</h2> */}
                <form onSubmit={submitHandler} className='rounded-lg shadow-md bg-white py-2 px-10 pb-7' encType="multipart/form-data">
                    <div className="mb-6 grid grid-cols-3 items-center">
                        <label className="block col-span-1 text-l mb-1 font-bold" htmlFor="name">
                            Category Image
                        </label>
                        <div className="flex items-center col-span-2 justify-center w-full">
                            <label
                                htmlFor="dropzone-file"
                                className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 border-blue-400 dark:hover:border-gray-500"
                            >
                                {isLoading ? (
                                    <>
                                        {selectedImage && (
                                            <img
                                                src={selectedImage}
                                                alt="Uploading..."
                                                className=" inset-0 w-[250px] h-[200px] object-cover filter blur-lg rounded-lg"
                                            />
                                        )}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                            <div className="relative w-3/4 bg-gray-300 rounded-full mt-5">
                                                <div
                                                    className="h-2 bg-blue-400 rounded-full"
                                                    style={{ width: `${uploadProgress}%` }}
                                                ></div>
                                            </div>
                                            <p className="mt-2 text-sm text-white">{uploadProgress}%</p>
                                        </div>
                                    </>
                                ) : selectedImage ? (
                                    <img
                                        src={selectedImage}
                                        alt="Uploaded preview"
                                        className="w-[280px] h-[200px] rounded-lg"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-12 mb-4 text-blue-400 dark:text-gray-400"
                                            aria-hidden="true"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-lg text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold text-blue-400">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                        </p>
                                    </div>
                                )}
                                <input
                                    id="dropzone-file"
                                    name="category_image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>
                    </div>















                    <div className="mb-6 grid grid-cols-3 items-center">
                        <label className="block  col-span-1 text-l mb-1 font-[550]" htmlFor="name">
                            Category Name
                        </label>
                        <input
                            name='name'
                            onChange={getSlug}
                            ref={nameRef}
                            type="text"
                            id="name"
                            className="px-5 py-2 col-span-2 border rounded-lg focus:outline-none "
                            placeholder="Enter category name"
                            required
                        />
                    </div>

                    <div className="mb-6 grid grid-cols-3 items-center">
                        <label className="block  col-span-1 text-l mb-1 font-[550]" htmlFor="slug">
                            Category Slug
                        </label>
                        <input
                            name='slug'
                            ref={slugRef}
                            readOnly
                            type="text"
                            id="slug"
                            className=" px-5 py-2 col-span-2 border rounded-lg focus:outline-none "
                        />
                    </div>


                    <div className='flex justify-center'>
                        <button
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center px-36 py-3">
                            Add Category
                        </button>
                    </div>
                </form>
            </div>




        </div>


    )
}
