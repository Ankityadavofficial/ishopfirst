import React, { useContext } from 'react'
import { Context } from '../../Context/Main'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdFavoriteBorder } from 'react-icons/md';
import { ImEye } from 'react-icons/im';

export default function AccessoriesBox({ main_image, name, final_price, original_price }) {
    const { API_BASE_URL, accessImageUrl } = useContext(Context);

    
    return (
        <>
            <div>
                <div className=' m-3 overflow-hidden cursor-pointer group hover:scale-110 transition duration-500 ease-in-out grid grid-cols-2 relative px-1 py-7 pl-5'>
                    <div className='translate-x-[-200px]  group-hover:translate-x-8 flex gap-1 transition duration-500 ease-in-out  absolute bottom-1 left-0 '>
                        <div className='cursor-pointer border-2 text-[#e8455a] rounded-full flex p-2 items-center justify-center border-[#ea8186] text-lg mb-1 hover:text-[#e8455a] hover:border-[#e8455a]'><MdFavoriteBorder /></div>
                        <div onClick={() => cartToDb(_id, final_price)} className='cursor-pointer border-2 text-white flex items-center p-2 justify-center  border-[#ea8186]  hover:border-[#e8455a] bg-[#ea8186] rounded-full text-lg mb-1 hover:bg-[#e8455a]'><AiOutlineShoppingCart /></div>
                        <div onClick={() => {
                            navigator(`/product-details/${_id}`)
                            window.scrollTo(0, 0);
                        }
                        } className='cursor-pointer border-2 flex items-center justify-center p-2 text-white  border-[#ea8186] hover:border-[#e8455a] bg-[#ea8186] rounded-full text-lg mb-1 hover:bg-[#e8455a]'><ImEye />
                        </div>
                    </div>
                    <div className='col-span-1 pb-5 flex items-center justify-center'>
                        <img src={API_BASE_URL + accessImageUrl + "/" + main_image} width={150} className='border h-40 p-3' alt="" />
                    </div>
                    <div className='text-base text-start space-y-3 pt-3'>
                        <div className='font-bold text-sm text-[#262626]'>{name}</div>
                        <div className=''>*******</div>
                        <div className='flex gap-2 font-medium'>
                            <span className='line-through text-[#C1C8CE] '>${original_price}</span>
                            <span className='text-[#FF4858]'>${Math.round(final_price)}</span>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}
