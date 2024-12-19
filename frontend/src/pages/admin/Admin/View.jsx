import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../../Context/Main';
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function View() {
    const { fetchCategory, API_BASE_URL, category, ADMIN_LIST_URL, categoryImageBaseUrl, CATEGORY_URL, notify, fetchAdmin, adminList } = useContext(Context);
    // const adminList = useSelector(store => store.adminLists);
    const navigator = useNavigate();
    const dispatchrer = useDispatch();

    useEffect(
        () => {
            fetchAdmin()
        }, []
    )

    const changeType = (admin_id, new_type) => {
        axios.put(API_BASE_URL + ADMIN_LIST_URL + "/change_type/" + admin_id + "/" + new_type)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        fetchAdmin()
                    }
                    notify(success.data.msg, success.data.status)
                }
            ).catch(
                (error) => {
                    notify("Client side error", 0)
                }
            )
    }

    const changeStatus = (admin_id, new_status) => {
        axios.put(API_BASE_URL + ADMIN_LIST_URL + "/change_status/" + admin_id + "/" + new_status)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        fetchAdmin()
                    }
                    notify(success.data.msg, success.data.status)
                }
            ).catch(
                (error) => {
                    notify("Client side error", 0)
                }
            )
    }



    const deleteData = (admin_id) => {
        axios.delete(API_BASE_URL + ADMIN_LIST_URL + "/delete/" + admin_id)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        fetchAdmin()
                    }
                    notify(success.data.msg, success.data.status)
                }
            ).catch(
                (error) => {
                    notify("client side error", 0)
                }
            )
    }





    return (
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
                                    to="/admin/admin-lists"
                                    className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Admin
                                </Link>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="relative overflow-x-auto bg-white mx-8 my-5 shadow rounded-lg">
                <div className='flex items-center justify-between p-5'>
                    <div className='font-bold'>All Categories List</div>
                    <Link to={'/admin/admin-lists/add'} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center px-10 py-2">
                        Add
                    </Link>
                </div>



                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs border text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className=" text-start px-6 py-5">
                                Admin Name
                            </th>
                            <th scope="col" className=" text-start px-6 py-5">
                                Admin Email
                            </th>
                            <th scope="col" className=" text-start px-6 py-5">
                                Admin Password
                            </th>
                            <th scope="col" className=" text-start px-6 py-5">
                                Super Admin / Admin
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
                            Array.isArray(adminList)
                            &&
                            adminList?.map(
                                (list, i) => {
                                    return (
                                        <tr style={{ display: list.main_admin ? "none" : " " }} key={i} className="bg-white border-b hover:bg-gray-50 ">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <div className=' flex justify-start '>
                                                    {list.name}
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                <div className=' flex justify-start'>
                                                    {list.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className=' flex justify-start'>
                                                    {list.password}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className=' flex justify-start'>
                                                    {
                                                        list.admin_type
                                                            ? <button onClick={() => changeType(list._id, false)}>
                                                                Super Admin
                                                            </button>
                                                            : <button onClick={() => changeType(list._id, true)}>
                                                                Admin
                                                            </button>
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className=' flex justify-start'>
                                                    {
                                                        list.status
                                                            ? <button onClick={() => changeStatus(list._id, false)}>
                                                                Active
                                                            </button>
                                                            : <button onClick={() => changeStatus(list._id, true)}>
                                                                Inactive
                                                            </button>
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className=' flex justify-start'>
                                                    <div className='flex gap-3 text-[35px]'>
                                                        <FaRegTrashAlt onClick={() => deleteData(list._id)} className='cursor-pointer w-12 text-blue-600 bg-blue-50 rounded-md p-[8px]  hover:bg-blue-600 hover:text-white' />
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
    )
}
