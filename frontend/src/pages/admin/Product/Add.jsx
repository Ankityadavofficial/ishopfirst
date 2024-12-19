import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context/Main';
import { generateSlug } from '../../../library';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

export default function Add() {
    const { API_BASE_URL, PRODUCT_URL, notify, category, fetchCategory, color, fetchColor } = useContext(Context);
    const nameRef = useRef();
    const slugRef = useRef();
    const originalRef = useRef();
    const discountRef = useRef();
    const finalRef = useRef();
    const [editorvalue, setEditorValue] = useState('');
    const [product_category, setProductCategory] = useState(null);
    const [product_color, setProductColor] = useState(null);

    const handleChange = (value) => {
        setEditorValue(value);
    };


    useEffect(
        () => {
            fetchCategory();
            fetchColor();
        }, []
    )

    const calFinalPrice = () => {
        const orinalPrice = originalRef.current.value;
        const discountPercent = discountRef.current.value;
        if (orinalPrice > 50 && orinalPrice != "" && discountPercent != "" && discountPercent < 100) {
            const finalPrice = orinalPrice - (orinalPrice * discountPercent) / 100;

            const remainder = finalPrice % 10;
            if (remainder < 50) {
                // Round down
                finalRef.current.value = Math.floor(finalPrice / 10) * 10;
            }
            else {
                // Round up
                finalRef.current.value = Math.ceil(finalPrice / 10) * 10;
            }
        } else if (orinalPrice <= 50) {
            finalRef.current.value = originalRef.current.value;
            discountRef.current.value = 0
        }
    }

    const getSlug = () => {
        const slug = generateSlug(nameRef.current.value);
        slugRef.current.value = slug;
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", e.target.name.value.trim());
        formData.append("slug", slugRef.current.value);
        formData.append("original_price", originalRef.current.value);
        formData.append("discount_percent", discountRef.current.value);
        formData.append("final_price", finalRef.current.value);
        formData.append("product_category", product_category);
        formData.append("product_color", JSON.stringify(product_color));
        formData.append("product_image", e.target.product_image.files[0]);
        formData.append("description", editorvalue);

        axios.post(
            API_BASE_URL + PRODUCT_URL + "/create",
            formData
            // {
            //     name: e.target.name.value.trim(),
            //     slug: slugRef.current.value,
            //     category_image: e.target.category_image.files[0]
            // }
        ).then(
            (success) => {
                if (success.data.status == 1) {
                    e.target.reset();
                    setEditorValue(null);
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
        <div className='mt-5'>
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
                                    to="/admin/product"
                                    className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Product
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




            <div className="relative  bg-white mx-8 my-5  shadow rounded-lg ">
                <div className='flex items-center px-8 py-3 mb-4 justify-between border-b-2 '>
                    <div className='text-xl font-[600] uppercase '>Add New Product</div>
                </div>

                {/* <h2 className="text-2xl font-bold mb-4">Add New Category</h2> */}
                <form onSubmit={submitHandler} className='rounded-lg shadow-md h-auto bg-white py-2 px-10 pb-7' encType="multipart/form-data">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="mb-6 ">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" id=''>
                                Product Name
                            </label>
                            <input
                                name='name'
                                onChange={getSlug}
                                ref={nameRef}
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" id=''>
                                Product Slug
                            </label>
                            <input
                                name='slug'
                                ref={slugRef}
                                readOnly
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="mb-6 ">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                Original Price
                            </label>
                            <input
                                name='original_price'
                                onChange={calFinalPrice}
                                ref={originalRef}
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                                required
                            />
                        </div>
                        <div className="mb-6 ">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                Dicount Precent
                            </label>
                            <input
                                name='discount_percent'
                                onChange={calFinalPrice}
                                ref={discountRef}
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                Final Price
                            </label>
                            <input
                                name='final_price'
                                readOnly
                                ref={finalRef}
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="mb-6 ">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                Select Category
                            </label>
                            <Select onChange={(opt) => setProductCategory(opt.value)} options={
                                category.map(
                                    (cat, i) => {
                                        return {
                                            value: cat._id,
                                            label: cat.name
                                        }
                                    }
                                )
                            } />
                        </div>
                        <div className="mb-6 ">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                Select Color
                            </label>
                            <Select onChange={(opt) => {
                                setProductColor(
                                    opt.map(
                                        (o) => {
                                            return o.value
                                        }
                                    )
                                )
                            }} isMulti closeMenuOnSelect={false} options={
                                color.map(
                                    (col, i) => {
                                        return {
                                            value: col._id,
                                            label: col.name
                                        }
                                    }
                                )
                            } />
                        </div>
                    </div>


                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                            Product Image
                        </label>
                        <input
                            multiple
                            name='product_image'
                            type="file"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                        />
                    </div>


                    <div>
                        <ReactQuill
                            className="mb-6"
                            value={editorvalue}
                            onChange={handleChange}
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
