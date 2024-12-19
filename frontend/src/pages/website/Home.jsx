import React, { useContext, useEffect, useState } from 'react'
import Conatiner from '../../components/Conatiner'
import { Context } from '../../Context/Main'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductBox from '../../components/website/ProductBox'
import AccessoriesBox from '../../components/website/AccessoriesBox'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Slider from "react-slick";


export default function Home() {
    const { category, fetchCategory, fetchProduct, product, accessories, fetchAccessories } = useContext(Context)
    const { category_slug } = useParams()
    const [visibleCount, setVisibleCount] = useState(8)
    const navigator = useNavigate()



    const PrevArrow = ({ onClick }) => (
        <div
            onClick={onClick}
            className="absolute -left-16 hover:scale-125 top-1/3 cursor-pointer"
        >
            <IoIosArrowBack fontSize={70} />
        </div>
    );

    // Custom Next Button
    const NextArrow = ({ onClick }) => (
        <div
            onClick={onClick}
            className="absolute -right-16 top-1/3 hover:scale-125 cursor-pointer"
        >
            <IoIosArrowForward fontSize={70} />
        </div>
    );


    const corousel = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: false
    }

    const settings = {
        className: "center",
        slidesToScroll: 1,
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        nextArrow: <NextArrow />, // Add custom next arrow
        prevArrow: <PrevArrow />
    };


    const loadMoreProducts = () => {
        setVisibleCount(prevCount => prevCount + 4); // Load 8 more products on each click
        if (visibleCount > 12) {
            navigator('/store')
        }
    };


    const visibleProducts = Array.isArray(product)
        ? (product.length > 1 ? product.slice(0, visibleCount) : product)
        : [];


    useEffect(
        () => {
            fetchCategory()
            fetchAccessories()
        }, []
    )

    useEffect(
        () => {
            fetchProduct(null, category_slug ?? null)
        }, [category_slug]
    )

    // const prod = [
    //     {
    //         name: "All",
    //         url: "/all"
    //     },
    //     {
    //         name: "Mac",
    //         url: "/mac"
    //     },
    //     {
    //         name: "iPhone",
    //         url: "/iphone"
    //     },
    //     {
    //         name: "iPad",
    //         url: "/ipad"
    //     },
    //     {
    //         name: "iPod",
    //         url: "/ipod"
    //     },
    //     {
    //         name: "Accessories",
    //         url: "/accessories"
    //     },
    // ]
    return (
        <>
            <div className='slider-container' >
                <Slider {...corousel}>
                    <div>

                        <div className='w-full mt-7 h-[450px] md:h-[650px] relative banner-bg' >
                            <img width={530} src="images/corousel.png" className='absolute bottom-0 md:right-28 md:h-[auto] h-[100%] sm:right-[30%]' alt="" />
                        </div>
                    </div>
                    <div>

                        <div className='w-full mt-7  h-[450px] md:h-[650px] relative second-banner' >
                            <img width={350} src="images/beats_solo_1.webp" className='absolute bottom-0 md:right-64 md:h-[auto] h-[100%] sm:right-[30%]' alt="" />
                        </div>
                    </div>
                    <div>

                        <div className='w-full mt-7  h-[450px] md:h-[650px] relative third-banner ' >
                            <img width={600} src="images/black-apple.png" className='absolute bottom-0 md:right-20 md:h-[auto] h-[100%] sm:right-[30%]' alt="" />
                        </div>
                    </div>
                </Slider>
            </div>

            <Conatiner className="mt-14">
                <div className='text-center'>
                    {/* <span className='text-3xl font-bold tracking-[0.75px] text-[#22262A]'>BEST SELLER</span>

                    <ul className='flex justify-center gap-12 tracking-[0.35px] font-semibold mt-7'>
                        <li><Link></Link></li> */}

                    {/* {prod.map(
                            (pro, i) => {
                                return (
                                    <li>{pro.name}</li>
                                )
                            }
                        )} */}
                    {/* </ul> */}
                    <CategoryFilter data={category} category_slug={category_slug} />
                </div>
                <div className='grid grid-cols-4 gap-7 mt-10'>
                    {
                        product.length != 0
                            ?
                            visibleProducts.map(
                                (pro) => {
                                    return (
                                        <ProductBox {...pro} key={pro._id} />
                                    )
                                }
                            )
                            :
                            <h2>No Product Found</h2>
                    }
                </div>
                <div style={{
                    display: product.length > visibleCount ? "flex" : "none"
                }} className='justify-center mt-8' ><Link onClick={loadMoreProducts} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center px-10 py-3">
                        Load More
                    </Link></div>
            </Conatiner>


            <div className='w-full mt-28  h-[450px] md:h-[600px] bg-[#2E90E5] relative ' >
                <img src="images/iphone_6_plus.png" className='absolute bottom-0 md:right-28 md:h-[auto] h-[100%] sm:right-[30%]' alt="" />
                <Conatiner className="pt-36">
                    <div className='w-[393px] h-[264px]  text-white flex flex-col gap-6'>
                        <span className='text-6xl font-light '>iPhone 6 Plus</span>
                        <span className='text-2xl'>Performance and design. Taken right to the edge.</span>
                        <span className='text-sm w-20 mt-7 font-bold text-center border-b-4'>SHOP NOW</span>
                    </div>
                </Conatiner>
            </div>

            <Conatiner className="mt-20 grid grid-cols-3 gap-16 ">
                <div className=' flex flex-col items-center gap-7'>
                    <img width={70} src="images/shipping.svg" alt="" />
                    <span className='text-2xl text-center font-semibold' >FREE SHIPPING</span>
                    <span className='text-sm text-justify'>We’re thrilled to offer FREE SHIPPING to make your shopping experience even better. Whether you're upgrading to the latest iPhone, grabbing essential accessories, or exploring our exclusive deals, your order will be delivered to your doorstep at no extra cost.

                        Shop now and enjoy the convenience of fast, reliable, and FREE SHIPPING—because you deserve nothing less! 💻📦</span>
                </div>
                <div className=' flex flex-col items-center gap-7'>
                    <img width={46} src="images/refund.svg" alt="" />
                    <span className='text-2xl text-center font-semibold' >100% REFUND</span>
                    <span className='text-sm text-justify'> <p className='font-semibold text-base'> Shop Worry-Free with Our 100% Refund Guarantee! 💯💸</p>

                        Your satisfaction is our priority! That’s why we offer a 100% REFUND policy to ensure a hassle-free shopping experience. If you're not completely satisfied with your purchase, you can return it within the specified time frame for a full refund.</span>
                </div>
                <div className=' flex flex-col items-center gap-7'>
                    <img width={42} src="images/support.svg" alt="" />
                    <span className='text-2xl text-center font-semibold' >SUPPORT 24/7</span>
                    <span className='text-sm text-justify'>Our dedicated support team is available <b>24/7</b>  to assist you with any questions, concerns, or issues. Whether it’s day or night, we’re just a message or call away, ensuring you get the help you need whenever you need it.</span>
                </div>
            </Conatiner>
            <div className='text-center uppercase text-3xl font-semibold py-16'>
                <span>
                    FEATURED PRODUCTS
                </span>

                <Conatiner >
                    <div className="slider-container">
                        <Slider {...settings}>
                            {
                                accessories.length !== 0
                                    ?
                                    accessories.map(
                                        (acc) => {
                                            return (
                                                <AccessoriesBox {...acc} key={acc._id} />
                                            )
                                        }
                                    )
                                    :
                                    <h2 className="text-center">No Product Found</h2>
                            }
                        </Slider>
                    </div>
                </Conatiner>
            </div>
        </>
    )
}


const CategoryFilter = ({ data, category_slug }) => {
    return (<>
        <span className='text-3xl font-bold tracking-[0.75px] text-[#22262A]'>BEST SELLER</span>
        <ul className='flex justify-center gap-12 tracking-[0.35px] mt-7'>
            <li className={`${category_slug == undefined && "text-blue-500 font-bold"}`}><Link to={`/`} >All</Link></li>
            {data.map(
                (cat, i) => {
                    return (
                        <li key={i} className={`${category_slug == cat.slug && "text-blue-500 font-bold"}`} > <Link to={`/${cat.slug}`} > {cat.name}</Link></li>
                    )
                }
            )
            }
            <li><Link to={`/store`} >Accessories</Link></li>
        </ul>
    </>
    )
}