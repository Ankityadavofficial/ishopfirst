import React, { useContext, useEffect, useState } from 'react'
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoBagHandle, IoSearchSharp } from "react-icons/io5";
import { MdMenuOpen } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import Conatiner from '../Conatiner';
import { useDispatch, useSelector } from 'react-redux';
import { IoCloseSharp } from "react-icons/io5";
import { Context } from '../../Context/Main';
import axios from 'axios';
import { changeQty, emptyCart, removeFromCart } from '../../reducers/Cart';
import { MdDelete } from "react-icons/md";
import { logout } from '../../reducers/User';

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { data: cartData, total: cartTotal } = useSelector(store => store.cart)
  const { PRODUCT_URL, API_BASE_URL, productImageBaseUrl } = useContext(Context)
  const [products, setProduct] = useState([])
  const user = useSelector(store => store.user)
  const dispatcher = useDispatch()
  const navigator = useNavigate()

  useEffect(
    () => {
      setCartOpen(false);
      document.body.style.overflow = ''

    }, [location.pathname]
  )

  console.log(cartData);


  useEffect(
    () => {
      if (cartData.length == 0) {
        setCartOpen(false)
      }
    }, []
  )

  useEffect(
    () => {
      axios.get(API_BASE_URL + PRODUCT_URL)
        .then(
          (success) => {
            setProduct(success.data.product);
          }
        ).catch(
          () => {

          }
        )
    }, []
  )



  const logoutHandler = () => {
    dispatcher(logout());
    dispatcher(emptyCart())
    navigator('/');
  }

  const checkOut = () => {
    document.body.style.overflow = ''
    if (user.data) {
      navigator('/checkout')
    } else {
      navigator('/login')
    }
  }

  const deleteProd = (prod_id, price) => {

    if (user.data != null) {
      axios.post('http://localhost:5000/user/delete-prod',
        {
          user_id: user.data._id,
          prod_id,
          price
        }
      )
    }
    if (cartData.length == 1) {
      setCartOpen(false)
      document.body.style.overflow = ''
    }
    dispatcher(removeFromCart(
      {
        pId: prod_id,
        price: price
      }
    ))
  }

  const changeQuantity = (product_id, new_qty, price) => {
    if (user.data != null) {
      axios.post('http://localhost:5000/user/change-qty',
        {
          user_id: user.data._id,
          product_id,
          new_qty
        }
      )
    }
    // const found = cartData.find(d => d.pId == product_id)
    // if (found.qty == 1) {
    //   console.log("sdbhhfgsjk");

    //   deleteProd(product_id, price)
    // }

    dispatcher(changeQty(
      {
        pId: product_id,
        new_qty: new_qty,
        price: price
      }
    ))
  }

  const items = [
    {
      name: "Home",
      url: '/'
    },
    {
      name: "store",
      url: '/store'
    },
    {
      name: "Iphone",
      url: '/iphone'
    },
    {
      name: "Ipad",
      url: '/ipad'
    },
    {
      name: "Macbook",
      url: '/macbook'
    },
    {
      name: "Accessories",
      url: '/accessorie'
    },
  ]

  return (
    <>
      <div className='w-full header-bg hidden md:block sticky top-0 bg-white z-[9999]  '>
        <Conatiner className="flex justify-between ">
          <div className='flex gap-6 items-center'>
            <div className='flex items-center gap-3'>
              <span>
                EN
              </span>
              <FaCaretDown />
            </div>
            <div className='flex items-center gap-3'>
              <span>$</span>
              <FaCaretDown />
            </div>
          </div>

          <div className='flex gap-5 items-center'>
            {
              user.data == null
                ? <Link to='/login'>Login</Link>
                : <>
                  <div className='flex items-center gap-3'>
                    <Link title='Go to profile' to='/my-profile' className='flex items-center gap-3'>
                      <FaRegUser />
                      <span>Hii, {user.data.name}</span>
                    </Link>
                    <span className='cursor-pointer' onClick={logoutHandler} >Logout</span>
                  </div>
                </>
            }

            {/* <div className='flex items-center gap-3'>
              <FaRegUser />
              <span>My Profile</span>
            </div> */}

            <div onClick={() => {
              setCartOpen(true);
              document.body.style.overflow = 'hidden'
            }} className='flex cursor-pointer items-center gap-1'>
              <FaCartShopping />
              <span >{cartData?.length} Items</span>
            </div>
            <span className='text-[#262626] opacity-50'>$ {cartTotal != undefined ? cartTotal.toLocaleString() : ''}</span>

            <Link title='Go to orders' to={`${user.data == null ? "login" : "my-orders"}`} className='flex justify-center items-center cursor-pointer gap-1'> <IoBagHandle /> <span> Orders </span></Link>
          </div>
        </Conatiner >
        <div onClick={() => {
          setCartOpen(false)
          document.body.style.overflow = ''
        }} className={`fixed top-0 left-0 w-full h-full`}
          style={{
            background: "rgba(0,0,0,0.7)",
            opacity: cartOpen ? 1 : 0,
            visibility: cartOpen ? "visible" : "hidden"
          }}>
        </div>

        <aside className={`w-[600px] overflow-y-scroll h-[100vh] shadow-lg bg-white fixed top-0 z-[9999] transform transition-transform duration-[400ms] ${cartOpen ? 'translate-x-0' : 'translate-x-[-100%]'
          }`}
          style={{ left: 0 }}
        >
          <div className='p-2 cursor-pointer text-2xl'>
            <IoCloseSharp className='absolute' onClick={() => {
              setCartOpen(false)
              document.body.style.overflow = ''
            }} />
          </div>
          <div className='text-2xl text-center mb-3'>Shoping Cart</div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="uppercase border-b ">
                <tr className='text-center'>
                  <th className="border-r ">
                    Sr
                  </th>
                  <th className="border-r ">
                    Product
                  </th>
                  <th className="border-r ">
                    Qty
                  </th>
                  <th className="border-r ">
                    Total
                  </th>
                  <th className="">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  products.length != 0 &&
                  cartData?.map(
                    (cd, i) => {
                      const prod = products.find(p => cd.pId == p?._id);

                      return <tr key={prod?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r"
                        >
                          {i + 1}
                        </th>
                        <td className="px-2 py-3 border-r">
                          <img width={100} src={API_BASE_URL + productImageBaseUrl + "/" + prod?.main_image} alt="" />
                          <div className='mt-2' >Name: {prod?.name}</div>
                          <div className='mt-2' >Price: $ {Math.round(prod?.final_price)}</div>
                        </td>
                        <td className="px-2 py-3 border-r">
                          <div className=' bg-gray-100 text-base flex justify-around w-24 m-auto py-1'>
                            <button onClick={() => {
                              changeQuantity(
                                prod?._id,
                                cd.qty - 1,
                                prod?.final_price
                              )
                              if (cd.qty == 1) {
                                deleteProd(prod?._id,
                                  prod?.final_price
                                )
                              }
                            }}
                              className='text-blue-500 font-bold px-2' >-</button>
                            {cd.qty}
                            <button onClick={() => changeQuantity(
                              prod?._id,
                              cd.qty + 1,
                              prod?.final_price
                            )}
                              className='text-blue-500 font-bold px-2' >+</button>
                          </div>
                        </td>
                        <td className="px-2 py-3 border-r whitespace-nowrap ">$ {(cd.qty * prod?.final_price).toFixed(0)}</td>
                        <td className="px-2 py-3">
                          <MdDelete fontSize={22} className='cursor-pointer' onClick={() => deleteProd(prod?._id, prod?.final_price)} />
                        </td>
                      </tr>
                    }
                  )
                }
              </tbody>
            </table>
          </div>
          <div onClick={checkOut} className='p-3 bg-blue-500 sticky bottom-0 w-full cursor-pointer text-white text-center'>
            Proceed to Checkout -
            $ {cartTotal != undefined ? cartTotal.toLocaleString() : ''}
          </div>
        </aside>
      </div >

      <Conatiner>
        <div className='mt-[25px] px-3 flex justify-between  md:justify-center'>
          <img src="images/iSHOP Logo.svg" alt="" />
          <MdMenuOpen className='text-3xl  md:hidden' onClick={() => setToggle(true)} />
        </div>
        <ul className='md:flex hidden gap-16 uppercase justify-center m-5 font-semibold  text-[#22262A] text-[14px] tracking-[0.35px]'>
          {
            items.map(
              (item, i) => {
                return <li className={` flex flex-col justify-center items-center overflow-hidden group `} key={i}>
                  <Link to={item.url}>{item.name}</Link>
                  <div className='border border-[#e8455a] w-full -translate-x-full group-hover:translate-x-0 duration-200 '></div>
                </li>
              }
            )
          }

          {/* <li>
            <Link>Home</Link>
          </li>
          <li>
            <Link>Store</Link>
          </li>
          <li>
            <Link>Iphone</Link>
          </li>
          <li>
            <Link>IPAD</Link>
          </li>
          <li>
            <Link>MACBOOK</Link>
          </li>
          <li>
            <Link>ACCESORIES</Link>
          </li> */}
        </ul>

        {/* responsive menu */}
        <div className={`z-[99999] md:hidden responsive-menu duration-200 text-[#ffff] ${toggle == false ? 'left-[-100%]' : 'left-0'} `}>
          <IoClose className='text-4xl mt-4 ml-4' onClick={() => setToggle(false)} />
          <div className='flex justify-center'>
            <div className='w-[88%] border-b-2 pb-1  flex justify-center mt-3  text-[12px] gap-6'>
              <div className='flex items-center gap-3'>
                <FaCartShopping />
                <span>2 Items</span>
                <span className='text-[#fbfbfb] opacity-50'>$998</span>
              </div>
              <div className='flex items-center gap-3'>
                <FaRegUser />
                <span>My Profile</span>
              </div>

              <div className='flex gap-6 items-center'>
                <div className='flex items-center gap-3'>
                  <span>
                    EN
                  </span>
                  <FaCaretDown />
                </div>
                <div className='flex items-center gap-3'>
                  <span>$</span>
                  <FaCaretDown />
                </div>
              </div>
            </div>
          </div>
          <div className='flex relative justify-center rounded-2xl items-center mt-4'>
            <input type="search" className='flex justify-center outline-none text-[#4d4b4b] rounded-2xl w-[90%] ps-10 p-1 text-xl' name="" id="" placeholder='Search......' />
            <IoSearchSharp className='absolute text-[#4d4b4b] left-8 font-bold text-xl' />
          </div>
          <ul className='flex flex-col gap-12 uppercase items-center mt-12 text-[#ffffff] font-semibold text-[16px] tracking-[0.4px]'>
            {
              items.map(
                (item, i) => {
                  return <li key={i}>
                    <Link to={item.url}>{item.name}</Link>
                  </li>
                }
              )
            }
          </ul>
        </div>
        {/* ----------------- */}
      </Conatiner>
    </>
  )
}
