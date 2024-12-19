import React, { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context/Main'
import { FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import axios from 'axios';

export default function View() {
    const colourRef = useRef()
    const { fetchColor, color, API_BASE_URL, COLOR_URL, notify } = useContext(Context);


    useEffect(
        () => {
            fetchColor();
        }, []
    )

    const deleteColor = (c_id) => {
        axios.delete(API_BASE_URL + COLOR_URL + `/delete/${c_id}`)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        fetchColor();
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
                                    to="/admin/color"
                                    className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Color
                                </Link>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="relative px-14 overflow-x-auto bg-white mx-8 my-5 shadow rounded-lg">
                <div className='flex items-center justify-between p-5'>
                    <div className='font-bold'>All Categories List</div>
                    <Link to={'/admin/color/add'} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base  text-center px-10 py-2">
                        Add
                    </Link>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            Array.isArray(color)
                            &&
                            color.map(
                                (c, i) => {
                                    return (
                                        <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">
                                                <div className='w-16 h-12 rounded-[15px] shadow-lg' style={{
                                                    background: c.code
                                                }}></div>
                                            </td>
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {c.name}
                                            </th>
                                            <td className="px-6 py-4">{c.code}</td>

                                            <td className="px-6 py-4">
                                                <div className=' flex justify-start'>
                                                    <div className='flex gap-3 text-[35px]'>
                                                        <FaRegTrashAlt
                                                            onClick={() => deleteColor(c._id)} className='cursor-pointer w-12 text-blue-600 bg-blue-50 rounded-md p-[8px]  hover:bg-blue-600 hover:text-white' />

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
