import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context/Main';
import axios from "axios";
export default function Add() {
    const { API_BASE_URL, CATEGORY_URL, notify, ADMIN_LIST_URL } = useContext(Context);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const adminHandler = (e) => {
        e.preventDefault()
        axios.post(
            API_BASE_URL + ADMIN_LIST_URL + "/register",
            {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                admin_type: false,
                main_admin: false
            }
        ).then(
            (success) => {
                if (success.data.status == 1) {
                    e.target.reset();
                }
                notify(success.data.msg, success.data.status)
            }
        ).catch(
            (error) => {
                notify("Client side error", 0)
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
                                    className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Add
                                </Link>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>


            <div className="relative overflow-x-auto bg-white mx-8 my-5 shadow rounded-lg ">
                <div className='flex items-center px-8 py-3 mb-4 justify-between border-b-2 '>
                    <div className='text-xl font-[600] uppercase '>Add New Admin</div>
                </div>
                {/* <h2 className="text-2xl font-bold mb-4">Add New Category</h2> */}

                <form className='rounded-lg shadow-md bg-white py-2 px-10 pb-7' onSubmit={adminHandler} action="#" encType="multipart/form-data">

                    <div className="mb-6 ">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your Name
                        </label>
                        <input
                            ref={nameRef}
                            name='name'
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="mb-6 ">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your Email
                            </label>
                            <input
                                ref={emailRef}

                                name='email'
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                ref={passwordRef}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg  text-center px-36 py-3">
                            Create Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
