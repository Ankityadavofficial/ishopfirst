import React, { useContext, useState } from 'react';
import { Context } from '../../Context/Main';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../reducers/User';
import { useDispatch, useSelector } from 'react-redux';
import { dbToCart } from '../../reducers/Cart';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Register() {
    const { data: cartData, total: cartTotal } = useSelector(store => store.cart)
    const { notify } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setNames] = useState('')
    const [contact, setContact] = useState('')
    const [error, setError] = useState('')
    const navigator = useNavigate();
    const dispatcher = useDispatch()
    const [showpassword, setShowPassword] = useState(false)

    const handleValidation = () => {
        if (!email) {
            setError("Email is required.");
        } else if (!name) {
            setError("Name is required.");
        } else if (!contact) {
            setError("Mobile number is required.");
        } else if (!password) {
            setError("Password is required.");
        } else {
            setError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post(
                'http://localhost:5000/user/register',
                {
                    email, password, name, contact
                }
            ).then(
                (success) => {
                    notify(success.data.msg, success.data.status)
                    if (success.data.status == 1) {
                        navigator('/login')
                        setContact('')
                        setNames('')
                        setPassword('')
                        setEmail('')

                    } else {
                        setError(success.data.msg)
                    }
                }
            )
        } catch (error) {
            console.log(error.message);

            setError("Login failed. Please try again.")
        }
    };

    return (
        <div className="flex relative flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className='absolute top-10 '>
                <img src="images/iSHOP Logo.svg" alt="" />
            </div>
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center">Create Account</h2>
                {error && <p className='mb-4 text-red-500'>{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            onBlur={handleValidation}
                            value={name}
                            onChange={(e) => setNames(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='First and last name'
                        />
                    </div>

                    <div>
                        <label htmlFor="contact" className="block text-sm font-bold">
                            Mobile number
                        </label>
                        <input
                            type="number"
                            id="contact"
                            onBlur={handleValidation}
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Mobile number'
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onBlur={handleValidation}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Email'
                        />
                    </div>

                    <div className='relative'>
                        <label htmlFor="password" className="block text-sm font-bold">
                            Password
                        </label>
                        <FaEyeSlash onClick={() => setShowPassword(false)} className={`absolute hover:text-gray-500 cursor-pointer z-10 top-1/2 right-3 ${showpassword ? "block" : 'hidden'} `} fontSize={27} />
                        <FaEye onClick={() => setShowPassword(true)} className={`absolute top-1/2 hover:text-gray-500 cursor-pointer right-3 ${showpassword ? "hidden" : 'block'}  `} fontSize={26} />
                        <input
                            type={showpassword == true ? 'text' : "password"}
                            id="password"
                            value={password}
                            minLength="6"
                            onBlur={handleValidation}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='At least 6 characters'
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-[#ea8186] rounded-lg hover:bg-[#e8455a]"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-gray-600">
                    Already have an account? {' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
