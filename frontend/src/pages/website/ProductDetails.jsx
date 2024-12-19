import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Main'
import { useParams } from 'react-router-dom'
import Conatiner from '../../components/Conatiner'
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../reducers/Cart';

export default function ProductDetails() {
    const pro_id = useParams()
    const { product, API_BASE_URL, productImageBaseUrl, fetchProduct } = useContext(Context)
    const proId = pro_id.prod_id
    const [otherimage, setOtherImage] = useState('')
    const user = useSelector(store => store.user);
    const dispatcher = useDispatch()



    // console.log(product)

    // const htmlString = product.description
    // const cleanText = htmlString?.replace(/<[^>]*>?/gm, '');



    useEffect(
        () => {
            if (proId != null) {
                fetchProduct(proId);
            }
        }, [proId]
    )


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

        <Conatiner className=" p-5 ">
            <div className='w-full  grid grid-cols-2 gap-4'>
                <div className='relative'>

                    <div className="border flex justify-center  rounded-[15px]">
                        <div className=' my-8 mx-5 rounded-[15px] overflow-hidden'>
                        <img className='w-[100%] h-[100%]' src={`${API_BASE_URL}${productImageBaseUrl}/${otherimage == '' ? product?.main_image : otherimage}`} alt="" />
                        </div>
                    </div>

                    <div className="flex top-5 left-[-60px] flex-col absolute w-[full] gap-3">
                        {
                            product.other_images?.map(
                                (im, i) => {
                                    return (
                                        <div key={i} onMouseEnter={()=>{ setOtherImage(im)}} onClick={() => {
                                            setOtherImage(im)
                                        }} className='border rounded-md overflow-hidden ' >
                                            <img className={`w-[50px] cursor-pointer h-[50px]`} src={`${API_BASE_URL}${productImageBaseUrl}/${im}`} alt="" />
                                        </div>
                                    )
                                }
                            )

                        }

                    </div>
                </div>
                <div className='col-span-1  py-5 px-10'>
                    <div className=' mb-4 font-bold text-3xl capitalize border-b border-gray-500 pb-2 text-gray-700' >{product.name}</div>
                    <div className=' mb-4  flex gap-3 text-2xl border-b border-gray-500 pb-2 ' > <span className='text-gray-600 line-through'> ${product.original_price} </span> <span className='text-gray-700  font-bold'> ${product.final_price} </span></div>
                    <div className=' mb-4 font-semibold text-xl ' >Color</div>
                    <div className=' mb-4 border-b border-gray-500 pb-2 ' >
                        <ul className='flex gap-3'>
                            {product.colors?.map(
                                (c) => {
                                    return <li title={c.name} key={c._id} className='border-2 cursor-pointer w-[30px] p-1 h-[30px] rounded-full' style={{ borderColor: [`${c.code}`], }}>
                                        <div className='border w-full h-full font-bold rounded-full' style={{ backgroundColor: [`${c.code}`], }}></div>
                                    </li>
                                }
                            )}
                        </ul>
                    </div>

                    <div onClick={() => cartToDb(product._id, product.final_price)} className=' text-white w-44 flex justify-center gap-2 text-lg items-center bg-blue-400 mb-4 rounded p-2 cursor-pointer hover:bg-blue-500'><AiOutlineShoppingCart fontSize={20} /> <span>ADD TO CART</span> </div>

                    <div className='mb-4 w-[80%] text-justify text-gray-500'>
                        {product.description ? (
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        ) : (
                            <p>No description available.</p>
                        )}
                    </div>

                </div>
            </div>

        </Conatiner>





        {/* 
        <div className='col-span-2'>
            <div className='bg-white rounded-[15px] shadow-md p-7 '>
                <div className="border flex justify-center bg-blue-50 rounded-[15px]">
                    <img className='w-[276px] h-[250px] py-7 px-2' src={`${API_BASE_URL}${productImageBaseUrl}/${product?.main_image}`} alt="" />
                </div>
                <div className='p-4'>
                    <div className=' mb-2 '><span className='font-semibold text-xl pr-4'>{product?.name}</span><span className='text-lg'>({product.category_id?.name})</span> </div>

                    <div className='mb-1'>Price:</div>
                    <div className='mb-2'>
                        <span className='font-semibold text-lg text-[#5d7186] line-through'>${product.final_price}</span>
                        <span className='font-semibold text-lg ms-2'>${product.original_price}</span>
                        <span className='font-semibold text-sm text-[#5d7186] ms-2'>({product.discount_percentage}% Off)</span>
                    </div>
                    <div>Colors :</div>
                    <div className='grid grid-cols-4 mt-2 gap-2'>{


                        product.colors?.length != undefined
                            ?
                            product.colors?.map(
                                (c, i) => {
                                    return <div key={i} className=' w-10 h-10 rounded-xl flex justify-center items-center'>
                                        <div style={{ backgroundColor: [`${c.code}`] }} className="rounded-full w-5 h-5"></div>
                                    </div>
                                }
                            )
                            :
                            <div className='col-span-4 font-semibold'>No colors</div>
                    }</div>
                </div>
            </div>
        </div> */}

    </>

    )
}
