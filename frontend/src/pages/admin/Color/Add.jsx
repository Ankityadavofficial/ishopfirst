import axios from 'axios'
import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context/Main'
import { useSelector } from 'react-redux'
import store from '../../../store'

export default function Add() {
    const { API_BASE_URL, COLOR_URL, notify } = useContext(Context)
    const nameRef = useRef()
    const codeRef = useRef()
    const colourRef = useRef()
    const admin = useSelector(store => store.admin)

    const getColor = () => {
        const coders = colourRef.current.value;
        codeRef.current.value = coders
    }

    const submitHandler = (e) => {
        e.preventDefault()
        // const formData = new FormData();
        // formData.append("name", e.target.name.value.trim());
        // formData.append("code", codeRef.current.value);


        axios.post(
            API_BASE_URL + COLOR_URL + "/create",
            {
                name: e.target.name.value.trim(),
                code: codeRef.current.value
            },

            {
                headers: {
                    Authorization: admin.token
                }
            },
        ).then(
            (success) => {
                if (success.data.status == 1) {
                    e.target.reset();
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
                                    to="#"
                                    className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Add
                                </Link>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className=' mx-8 my-5 shadow rounded-lg bg-white'>
                <div className="px-7 py-2 border-b-2">
                    <span
                        htmlFor="newcolor"
                        className="block uppercase text-[25px] font-semibold text-gray-900 dark:text-white"
                    >
                        Add New Colors
                    </span>
                </div>

                <form className="p-7" onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="grid grid-cols-3 p-2 ">
                        <label
                            htmlFor="name"
                            className="block col-span-1 ps-16 text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            Color Name :
                        </label>
                        <input
                            ref={nameRef}
                            name='name'
                            type="text"
                            id="name"
                            className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block px-4 py-2.5 "
                            placeholder="Enter Color Name"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-3 p-2 ">
                        <label
                            htmlFor="code"
                            className="block col-span-1 ps-16 text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            Color Code :
                        </label>
                        <input
                            readOnly
                            ref={codeRef}
                            name='code'
                            type="text"
                            id="code"
                            className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block px-4 py-2.5 "
                        />
                    </div>

                    <div className="grid grid-cols-3 p-2 ">
                        <label
                            htmlFor="colour"
                            className="block col-span-1 ps-16 text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            Pick Color :
                        </label>
                        <input
                            onChange={getColor}
                            ref={colourRef}
                            name='colour'
                            type="color"
                            id="colour"
                            // value="#000000"
                            className="col-span-2 px-4 py-1.5  bg-gray-50  w-full border-gray-300  border rounded-lg outline-none scale- "
                            required=""
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </div>

        </div>
    )
}
