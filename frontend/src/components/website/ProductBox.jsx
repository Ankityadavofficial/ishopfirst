import React, { useContext, useState } from 'react'
import { Context } from '../../Context/Main'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../reducers/Cart';
import axios from 'axios';
import { ImEye } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';



export default function ProductBox({ _id, main_image, name, original_price, final_price }) {
    const { API_BASE_URL, productImageBaseUrl, } = useContext(Context);
    const dispatcher = useDispatch()
    const user = useSelector(store => store.user);
    const navigator = useNavigate()


    const cartToDb = (prod_id, price) => {
        if (user.data != null) {
            axios.post('http://localhost:5000/user/update-db',
                {
                    user_id: user.data._id,
                    prod_id
                }
            )
        }
        dispatcher(addToCart({
            product_id: prod_id,
            price: price
        }))
    }

    return (<>
        <div className='group overflow-hidden shadow-lg relative border-gray-100 border-2  rounded flex gap-5 flex-col px-5 py-10 items-center hover:scale-105
         transition duration-200 ease-in-out cursor-pointer ' >
            <div className='transition duration-300 ease-in-out absolute right-3 top-0 -translate-y-44 group-hover:translate-y-16 space-y-1 '>
                <div className='cursor-pointer border-2 text-blue-300 rounded-full p-2 text-center border-blue-300 text-2xl hover:text-blue-500 hover:border-blue-500'><MdFavoriteBorder /></div>
                <div onClick={() => cartToDb(_id, final_price)} className='cursor-pointer  text-white bg-blue-300 rounded-full p-2 text-center text-2xl hover:bg-blue-500'><AiOutlineShoppingCart /></div>
                <div onClick={() => {
                    navigator(`/product-details/${_id}`)
                    window.scrollTo(0, 0);
                }
                } className='cursor-pointer text-white bg-blue-300 rounded-full p-2 text-center text-2xl hover:bg-blue-500'><ImEye />
                </div>
            </div>
            <img src={API_BASE_URL + productImageBaseUrl + "/" + main_image} className='border-b-2 border-gray-100 w-53 h-40 px-2 pb-5' alt="" />
            <div className='font-bold text-sm  text-[#262626]'>{name}</div>
            <div className='flex flex-col gap-1'>
                <span className='text-center'>*******</span>
                <div className='text-center flex gap-2 font-medium'>
                    <span className='text-[#FF4858]'>${Math.round(final_price)}</span>
                    <span className='line-through text-[#C1C8CE] '>${original_price}</span>
                </div>
            </div>
        </div >
    </>
    )
}
