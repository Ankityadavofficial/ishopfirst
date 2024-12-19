import React, { useEffect, useRef, useState } from 'react';
import { MdAdminPanelSettings } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";
import { TfiControlForward } from "react-icons/tfi";
import { TiUser } from "react-icons/ti";
import { IoIosColorPalette } from "react-icons/io";
import { IoBagHandle } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';
import { login, logout } from '../../reducers/Admin';
// import { fetchAdminList } from '../../reducers/AdminList';
export default function SideBar() {
    const admin = useSelector(store => store.admin);
    const navigator = useNavigate();
    const dispatcher = useDispatch()
    const AUTO_LOGOUT = 1 * 60 * 60 * 1000 // 1 min 

    //                hrs * min * sec * millisec


    const [isActive, setIsActive] = useState(true);
    const history = useLocation();
    const timeoutRef = useRef();

    useEffect(() => {

        const handleActivity = () => {
            setIsActive(true);
            resetTimeout();
        };

        const handleLogout = () => {
            dispatcher(logout());
            navigator("/admin/login");
        };

        const resetTimeout = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            // Set a new timeout for auto logout
            timeoutRef.current = setTimeout(() => {
                handleLogout();
            }, AUTO_LOGOUT);
        };

        // Add event listeners for user activity
        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);
        window.addEventListener("click", handleActivity);

        // Initial reset of the timeout
        resetTimeout();

        // Cleanup function
        return () => {
            clearTimeout(timeoutRef.current);
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("keydown", handleActivity);
            window.removeEventListener("click", handleActivity);
        };
    }, []);


    useEffect(
        () => {
            const lsAdmin = localStorage.getItem("admin")
            const lsToken = localStorage.getItem("token")
            if (lsAdmin && lsToken) {
                dispatcher(login({ admin: JSON.parse(lsAdmin), token: lsToken }))
            }
        }, []
    )

    useEffect(
        () => {
            const lsAdmin = localStorage.getItem("admin")
            if (admin?.data == null && lsAdmin == null) {
                navigator("/admin/login");
            }
        }, [admin?.data]
    )

    const menu = [
        {
            group_name: '',
            items: [
                {
                    name: 'Dashboard',
                    icon: <TbLayoutDashboardFilled />,
                    url: '/admin',
                    display: true
                },
            ]
        },
        {

            group_name: 'general',
            items: [

                {
                    name: 'Category',
                    icon: <FaClipboardList />,
                    url: '/admin/category',
                    display: true
                },
                {
                    name: 'Color',
                    icon: <IoIosColorPalette />,
                    url: '/admin/color',
                    display: true
                },
                {
                    name: 'Products',
                    icon: <MdOutlineSystemSecurityUpdateGood />,
                    url: '/admin/product',
                    display: true
                },
                {
                    name: 'Accessories',
                    icon: <IoGameController />,
                    url: '/admin/accessories',
                    display: true
                },
            ]
        },
        {
            group_name: 'users',
            items: [
                {
                    name: 'Users',
                    icon: <TiUser />,
                    url: '/admin/user',
                    display: true
                },
                {
                    name: 'Admins',
                    icon: <TiUser />,
                    url: '/admin/admin-lists',
                    display: admin?.data?.admin_type
                },
            ]
        },
        {
            group_name: 'orders',
            items: [
                {
                    name: 'Orders',
                    icon: <IoBagHandle />,
                    url: '/admin/order',
                    display: true
                },
                {
                    name: 'Transactions',
                    icon: <GrTransaction />,
                    url: '/admin/transaction',
                    display: true
                },
            ]
        }


    ]

    return (
        <div className=' bg-[#262d34] box-border min-h-[100vh]'>
            <div className='flex px-7 justify-between text-xl text-white font-bold my-10 items-center'>
                <div className='flex'>
                    <MdAdminPanelSettings className='text-blue-500 mr-2 text-3xl' />
                    <span>
                        Admin panel
                    </span>
                </div>
                <TfiControlForward className=' text-[#9097a7] text-2xl mt-1' />
            </div>
            <ul>
                {
                    menu?.map(
                        (g, i) => {
                            return <React.Fragment key={i}>
                                <b className='my-1 px-3 block text-xs uppercase mt-5  text-[#9097a7]'>{g.group_name}</b>
                                {
                                    g.items?.map(
                                        (m, i) => {
                                            return <li key={i} style={{
                                                display: m.display == true ? "block" : "none"
                                            }}  className='my-1 px-[32px] border-2 border-[#262d34] py-2 hover:border-l-white hover:text-white text-[#9097a7]' >
                                                <Link to={m.url} className='flex gap-2 items-center'>
                                                    {m.icon}{m.name}
                                                </Link>
                                            </li>
                                        }
                                    )
                                }

                            </React.Fragment>
                        }
                    )
                }
                <li onClick={() => dispatcher(logout())} className='my-1 px-[32px] cursor-pointer border-2 border-[#262d34] py-2 hover:text-white hover:bg-gray-900 text-[#9097a7]' >
                    Logout
                </li>
            </ul>
        </div>
    )
}

