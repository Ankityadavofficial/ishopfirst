import React, { useContext, useEffect, useState } from 'react'
import Conatiner from '../../components/Conatiner'
import { Context } from "../../Context/Main"
import { Link, useParams, useSearchParams } from "react-router-dom"
import ProductBox from '../../components/website/ProductBox'
import AccessoriesBox from '../../components/website/AccessoriesBox'
import Slider from 'react-slick'
export default function Store() {
    const { category, fetchCategory, product, fetchProduct, accessories, fetchAccessories, fetchColor, color } = useContext(Context)
    const { category_slug } = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const [range, setRange] = useState({
        start: '',
        end: ''
    })
    const [color_id, setColorId] = useState()


    const corousel = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: true
    }


    const visibleProducts = Array.isArray(product)
        ? (product.length >= 1 ? product : [])
        : [];

    const clearFilter = () => {
        setRange({
            start: '',
            end: '',
        })
        setColorId('')
        setSearchParams("")
    }


    useEffect(
        () => {
            if (range.start != '' && range.end != '') {
                setSearchParams({
                    start: range.start,
                    end: range.end,
                })
            }
        }, [range]
    )

    // useEffect(
    //     () => {
    //         if (color_id != "") {
    //             setSearchParams({
    //                 color: color_id
    //             })
    //         }
    //     }, [color_id]
    // )

    useEffect(
        () => {
            fetchCategory()
            fetchColor()
            if (searchParams.get('start') && searchParams.get('end')) {
                setRange({
                    start: Number(searchParams.get('start')),
                    end: Number(searchParams.get('end'))
                })
            }
            // if (searchParams.get('color')) {
            //     setColorId({
            //         color: searchParams.get("color")
            //     })
            // }
        }, []
    )


    useEffect(
        () => {
            fetchProduct(null, category_slug ?? null, range.start, range.end, color_id ?? null)
        }, [category_slug, range, color_id]
    )

    // useEffect(
    //     () => {
    //         fetchAccessories(null, category_slug ?? null)
    //     }, [category_slug]
    // )

    return (
        <Conatiner className=" gap-6 grid grid-cols-5 mb-14">
            <div className=''>
                <CategorieFilter product={product} accessories={accessories} category_slug={category_slug} data={category} />
                <PriceFilter range={range} clearFilter={clearFilter} setRange={setRange} />
                <ColorFilter color_id={color_id} setColorId={setColorId} data={color} />
            </div>

            <div className='col-span-4 '>
                <div className='w-full h-[300px] rounded overflow-hidden '>
                    <div className='slider-container' >
                        <Slider {...corousel}>
                            <div>
                                <div className='w-full h-[450px] md:h-[300px] relative banner-bg mt-0' >
                                    <img width={270} src="images/corousel.png" className='absolute bottom-0 md:right-28 md:h-[auto] h-[100%] sm:right-[30%]' alt="" />

                                    <div className='w-[393px] h-[264px]  text-white flex flex-col gap-3  pt-16 pl-16'>
                                        <span className='text-4xl font-light '>iPhone 6 Plus</span>
                                        <span className='text-lg'>Performance and design. Taken right to the edge.</span>
                                        <span className='text-sm cursor-pointer w-20 font-bold text-center border-b-4'>SHOP NOW</span>
                                    </div>

                                </div>
                            </div>
                            <div>

                                <div className='w-full  h-[450px] md:h-[300px] relative second-banner' >
                                    <img width={170} src="images/beats_solo_1.webp" className='absolute bottom-0 md:right-28 md:h-[auto] h-[100%] sm:right-[30%]' alt="" />
                                    <div className='w-[393px] h-[264px]  text-white flex flex-col gap-3  pt-16 pl-16'>
                                        <span className='text-4xl font-light '>Beats Solo 1</span>
                                        <span className='text-lg'>Performance and design. Taken right to the edge.</span>
                                        <span className='text-sm cursor-pointer w-20 font-bold text-center border-b-4'>SHOP NOW</span>
                                    </div>
                                </div>
                            </div>
                            <div>

                                <div className='w-full  h-[450px] md:h-[300px] relative third-banner ' >
                                    <img width={300} src="images/black-apple.png" className='absolute bottom-0 md:right-28 md:h-[auto] h-[100%] sm:right-[30%]' alt="" />
                                    <div className='w-[393px] h-[264px]  text-white flex flex-col gap-3  pt-16 pl-16'>
                                        <span className='text-4xl font-light '>Black Apple Iphone 12 Pro Max</span>
                                        <span className='text-lg'>Performance and design. Taken right to the edge.</span>
                                        <span className='text-sm cursor-pointer w-20 font-bold text-center border-b-4'>SHOP NOW</span>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
                <div className='w-full grid mt-5 grid-cols-3 gap-7'>
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
                    {/* {
                        accessories.map(
                            (acc) => {
                                return (
                                    <AccessoriesBox {...acc} key={acc._id} />
                                )
                            }
                        )
                    } */}
                </div>
            </div>

        </Conatiner>
    )
}



const CategorieFilter = ({ data, category_slug, accessories, product }) => {
    // const { fetchAccessories } = useContext(Context)
    // const fetchacc = () => {
    //     fetchAccessories()
    // }
    let f = 0
    data.map(
        (d) => {
            return f += d.productCount
        }
    );


    return <>
        <div className='bg-[#F6F7F8] shadow rounded-md p-3'>
            <h2 className='text-lg font-bold'>All Categories</h2>
            <ul className='my-2'>
                <li className={`py-1 grid grid-cols relative ${category_slug == null && 'text-blue-500 font-semibold'}`}>
                    <Link to={`/store`}>
                        All <span className='absolute right-3'>({f})</span>
                    </Link>
                </li>
                {
                    data.map(
                        (d, i) => {
                            return <li key={d._id} className={`py-1 grid grid-cols relative cursor-pointer  ${category_slug == d.slug && 'text-blue-500 font-semibold'}`}>
                                <Link to={`/store/${d.slug}`}>
                                    {d.name} <span className='absolute right-3'> ({d.productCount})</span>
                                </Link>
                            </li>
                        }
                    )
                }
                {/* <li onClick={fetchacc} className={`py-1 relative grid grid-cols cursor-pointer ${category_slug == "accessories" && 'text-blue-500 font-semibold'}`}>
                    <Link to={`/store/accessories`}>
                        Accessories <span className='absolute right-3'>  ({accessories.length})</span>
                    </Link>
                </li> */}
            </ul>

        </div>
    </>

}

const PriceFilter = ({ range, clearFilter, setRange }) => {

    return <>
        <button onClick={clearFilter} className="p-2 bg-blue-500 text-white rounded-lg mt-5">
            Clear Filter
        </button>
        <div className='bg-[#F6F7F8] shadow my-5 rounded-md p-3'>
            <h2 className='text-lg font-bold'>Price Filter</h2>
            <div className='grid grid-cols-5 items-center gap-2 mt-2 text-center'>
                <input type="number" className='shadow p-1 col-span-2 rounded'
                    onChange={(e) => setRange(
                        {
                            end: range.end,
                            start: e.target.value
                        }
                    )} value={range.start} />
                to
                <input type="number" className='p-1 col-span-2 rounded shadow' onChange={(e) => setRange(
                    {
                        start: range.start,
                        end: e.target.value
                    }
                )} name="" value={range.end} id="" />
            </div>

        </div>
    </>
}

const ColorFilter = ({ data, setColorId, color_id }) => {
    return <>
        <div className='bg-[#F6F7F8] shadow my-5 rounded-md p-3'>
            <h2 className='text-lg font-bold'>Color</h2>
            <ul className='grid grid-cols-5 gap-3'>
                {
                    data.map(
                        (c) => {
                            return <li key={c._id} onClick={() => setColorId(c._id)} className='border-2 cursor-pointer w-[30px] p-1 h-[30px] rounded-full' style={{ borderColor: [`${c.code}`], }}>
                                <div className='border w-full h-full rounded-full' style={{ backgroundColor: [`${c.code}`], }}></div>
                            </li>
                        }
                    )
                }
            </ul>
        </div>
    </>
}