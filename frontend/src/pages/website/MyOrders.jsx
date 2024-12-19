import React, { useContext, useEffect, useState } from 'react'
import Conatiner from '../../components/Conatiner'
import { Context } from '../../Context/Main'
import { useSelector } from 'react-redux';
import { HiMiniShoppingBag } from "react-icons/hi2";
import { AiOutlineReload } from "react-icons/ai";
import { PiEyesFill } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa6";
import { FaSortUp } from "react-icons/fa6";


export default function MyOrders() {
    const { fetchOrders, orders, productImageBaseUrl, product, API_BASE_URL, fetchProduct } = useContext(Context);
    const user = useSelector(store => store.user)
    useEffect(
        () => {
            fetchOrders(user.data?._id)
        }, [user.data?._id]
    )

    useEffect(
        () => {
            fetchProduct()
        }, []
    )

    return (
        <Conatiner className='my-10'>
            <div className='text-4xl  border-b'>Your Orders</div>
            {
                orders.map(
                    (ord, i) => {
                        return <div key={ord._id} className=' border rounded border-gray-300  overflow-hidden my-5' >
                            <div className='flex bg-gray-100 pt-2 pb-5 justify-between pe-6'>
                                <div className="relative">
                                    <table className="text-sm text-left  text-gray-500 dark:text-gray-400">
                                        <thead className=" text-gray-700 ">
                                            <tr className='uppercase' >
                                                <th scope="col" className="px-6  py-1">
                                                    Order placed
                                                </th>
                                                <th scope="col" className="px-6 py-1">
                                                    Total
                                                </th>
                                                <th scope="col" className="px-6 py-1 ">
                                                    Ship to
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="text-base">
                                                <td className="px-6 py-1"> <DateFormatter dateString={ord.createdAt} /></td>
                                                <td className="px-6 py-1">₹{ord.order_total}</td>
                                                <td className="px-4 py-1 border-2 border-gray-100 transition duration-200 ease-in-out rounded-xl cursor-pointer group capitalize text-blue-600 flex justify-center items-center relative gap-2 hover:underline hover:text-gray-800 hover:border-blue-400 ">{ord.shipping_details.name} <FaAngleDown fontSize={20} className='text-gray-600' />
                                                    <div className='w-60 font-medium text-sm group-hover:block transition duration-200 ease-in-out  hidden rounded-lg py-2  px-7 text-gray-900 bg-white border capitalize border-gray-300 absolute top-9 shadow -left-5' >
                                                        <FaSortUp fontSize={25} className='absolute -top-[5%] left-[25%]  text-white' />
                                                        <p className='font-extrabold' >{ord.shipping_details.name}</p>
                                                        <p >{ord.shipping_details.addressLine1}</p>
                                                        <p >{ord.shipping_details.city}</p>
                                                        <p >{ord.shipping_details.district} , {ord.shipping_details.state}</p>
                                                        <p >{ord.shipping_details.pincode}</p>
                                                        <p >{ord.shipping_details.country}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='text-sm space-y-1'><p >ORDER # {ord._id}</p>
                                    <div className='text-base' ><span className='text-blue-600 hover:text-black cursor-pointer hover:underline' >View order details</span> | <span className=' text-blue-600 hover:text-black cursor-pointer hover:underline' >Invoice</span> </div>
                                </div>
                            </div>
                            {
                                ord.product_details.map(
                                    (prd, ind) => {
                                        const found = product.find(d => d._id == prd.product_id)
                                        return (
                                            <>
                                                <div key={found._id} className='grid grid-cols-6 my-3 mx-10'>
                                                    <div className='col-span-4 flex gap-10 ' >
                                                        <img src={API_BASE_URL + productImageBaseUrl + "/" + found.main_image} className='' width='15%' alt="" />
                                                        <div className='text-[15px] pt-5 text-blue-600 hover:text-black cursor-pointer hover:underline' >
                                                            {found.name}
                                                        </div>
                                                    </div>
                                                    <div className='col-span-2 flex flex-col gap-3 px-10' >
                                                        <button className='border text-white flex py-1 px-16 justify-center items-center rounded-2xl gap-2  bg-[#ea8186]  hover:bg-[#fc475f] '> <div className='relative flex justify-center items-center' > <PiEyesFill fontSize={25} /> </div>
                                                            <p >View your item</p>
                                                        </button>

                                                        <button className='border border-gray-500 hover:bg-gray-100  flex py-1 px-16 text-gray-500 hover:border-gray-800 hover:text-gray-800 justify-center items-center rounded-2xl gap-4 '> <div className='relative flex justify-center items-center' >
                                                            <HiMiniShoppingBag fontSize={10} className='absolute' /> <AiOutlineReload fontSize={25} /> </div>
                                                            <p>Buy it again</p>
                                                        </button>

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                )
                            }

                        </div>
                    }
                )
            }


        </Conatiner >
    )
}


const DateFormatter = ({ dateString }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return <div>{formatDate(dateString)}</div>;
};

const ProductDetails = ({ id }) => {
    const { productImageBaseUrl, product, API_BASE_URL, fetchProduct } = useContext(Context)
    useEffect(
        () => {
            fetchProduct(id)
        }, [id]
    )
    return (
        <>
            <img src={API_BASE_URL + productImageBaseUrl + "/" + product.main_image} alt="" />

        </>
    )
}