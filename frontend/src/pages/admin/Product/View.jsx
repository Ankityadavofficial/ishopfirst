import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context/Main'
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import axios from 'axios';
import { FaImage } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function View() {
    const { PRODUCT_URL, fetchProduct, productImageBaseUrl, product, API_BASE_URL, notify, fetchCategory } = useContext(Context);
    const [popup, setPopup] = useState(false)
    const [product_other_images, setOtherImages] = useState('')
    const [product_id, setProductId] = useState(null)

    useEffect(
        () => {
            fetchProduct();
            fetchCategory();
        }, []
    )

    const multipleImagePop = (p_id, other_images) => {
        setPopup(true)
        setOtherImages(other_images)
        setProductId(p_id)
    }

    const deleteData = (pro_id, productImage) => {
        axios.delete(API_BASE_URL + PRODUCT_URL + `/delete/${pro_id}/${productImage}`)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        fetchCategory();
                        fetchProduct();
                    }
                    notify(success.data.msg, success.data.status)
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    const otherImagesSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData;

        for (let other_images of e.target.other_images.files) {
            formData.append("other_images", other_images);
        }

        axios.post(API_BASE_URL + PRODUCT_URL + "/upload-other-images/" + product_id, formData)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        e.target.reset();
                        fetchProduct();
                        setPopup(false)
                    }
                    notify(success.data.msg, success.data.status)
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    const delImg = (index) => {
        axios.get(API_BASE_URL + PRODUCT_URL + `/delete-image/${index}/${product_id}`)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        fetchProduct();
                        const newArr = product_other_images.filter(
                            (d, i) => {
                                return i != index;
                            }
                        )
                        setOtherImages(newArr)

                    }
                    notify(success.data.msg, success.data.status)
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    return (
        <>
            <div className='fixed flex-col z-50 top-0 left-0 w-full h-full justify-center items-center ' style={{ display: popup ? "flex" : "none", background: "rgba(0,0,0,0.7" }}>

                <div className='w-[800px] bg-white my-3 rounded-lg p-2'>
                    <form action="" onSubmit={otherImagesSubmit} className='relative' encType="multipart/form-data">
                        <div className='flex justify-between items-center'>
                            <label htmlFor="">Upload more images</label> <br />
                            <FaWindowClose onClick={() => setPopup(false)} className='text-3xl mr-2 cursor-pointer' />
                        </div>
                        <input type="file" multiple={true} name='other_images' />
                        <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center px-10 py-2">
                            Upload
                        </button>
                    </form>
                </div>
                <div className='bg-white overflow-y-auto mb-2 justify-center p-3 w-[800px] rounded-lg grid grid-cols-5 gap-5'>
                    {
                        product_other_images.length == 0
                            ? <h4>No images yet</h4>
                            :
                            product_other_images.map(
                                (images, index) => {
                                    return <div key={index} className='relative'>
                                        <IoMdCloseCircleOutline title='Delete image' onClick={() => delImg(index)} className='absolute top-[-7px] right-[-7px] text-red-600 cursor-pointer text-2xl' />
                                        <img className='h-[120px] w-full border rounded-[15px] bg-blue-50 p-2' src={`${API_BASE_URL}${productImageBaseUrl}/${images}`} alt="" />
                                    </div>
                                }
                            )
                    }
                </div>

            </div>

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
                                        to="/admin/product"
                                        className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        Product
                                    </Link>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>


                <div className="relative overflow-x-auto bg-white mx-8 my-5 shadow rounded-lg">
                    <div className='flex items-center justify-between p-5'>
                        <div className='font-bold'>All Categories List</div>
                        <Link to={'/admin/product/add'} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center px-10 py-2">
                            Add
                        </Link>
                    </div>



                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs border text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className=" text-start px-6 py-5">
                                    Product Image
                                </th>
                                <th scope="col" className=" text-start px-6 py-5">
                                    Product Name / Product Slug
                                </th>
                                <th scope="col" className=" text-start px-6 py-5">
                                    Category
                                </th>
                                <th scope="col" className=" text-start px-6 py-5">
                                    Price
                                </th>
                                <th scope="col" className=" text-start px-6 py-5">
                                    Status
                                </th>
                                <th scope="col" className=" text-start px-6 py-5">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(product)
                                &&
                                product.map(
                                    (pro, i) => {
                                        return (
                                            <tr key={i} className="bg-white border-b hover:bg-gray-50 ">
                                                <td className="px-6 py-2">
                                                    <div className=' flex justify-start'>
                                                        <img width={90} className='border rounded-[15px] bg-blue-50 p-2' src={`${API_BASE_URL}${productImageBaseUrl}/${pro.main_image}`} alt="" />
                                                    </div>
                                                </td>
                                                <td
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900  dark:text-white"
                                                >
                                                    <div className=' flex  justify-start '>
                                                        {pro.name} /    {pro.slug}
                                                    </div>
                                                </td>
                                                <td
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    <div className=' flex justify-start '>
                                                        {pro.category_id?.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className=' flex justify-start'>
                                                        Original Price : {pro.original_price} <br />
                                                        Discount Percent : {pro.discount_percentage}% <br />
                                                        Final Price : {pro.final_price}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className=' flex justify-start'>
                                                        {
                                                            pro.status
                                                                ? <button onClick={() => changeStatus(pro._id, false)}>
                                                                    Active
                                                                </button>
                                                                : <button onClick={() => changeStatus(pro._id, true)}>
                                                                    Inactive
                                                                </button>
                                                        }
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className=' flex justify-start'>
                                                        <div className='flex gap-3 text-[35px]'>
                                                            <FaRegTrashAlt title='Delete Product' onClick={() => deleteData(pro._id, pro.main_image)} className='cursor-pointer w-12 text-blue-600 bg-blue-50 rounded-md p-[8px]  hover:bg-blue-600 hover:text-white' />
                                                            <Link to={`/admin/product/edit/${pro._id}`}>
                                                                <AiOutlineEdit title='Edit Product' className='cursor-pointer text-blue-600 bg-blue-50 rounded-md  w-12  p-[7px] hover:bg-blue-600 hover:text-white' />
                                                            </Link>
                                                            <FaImage title='Other Images' onClick={() => multipleImagePop(pro._id, pro.other_images)} className='cursor-pointer w-12 text-blue-600 bg-blue-50 rounded-md p-[8px]  hover:bg-blue-600 hover:text-white' />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                )
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </>

    )
}
