import React, { useContext, useState } from 'react';
import { Context } from '../../Context/Main';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../reducers/User';
import { useDispatch, useSelector } from 'react-redux';
import { dbToCart } from '../../reducers/Cart';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
    const { data: cartData, total: cartTotal } = useSelector(store => store.cart)
    const { notify } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const navigator = useNavigate();
    const dispatcher = useDispatch()
    const [showpassword, setShowPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        if (!email || !password) {
            setError('Please enter both email and password.')
            return
        }
        try {
            axios.post(
                'http://localhost:5000/user/login',
                {
                    email, password
                }
            ).then(
                (success) => {
                    notify(success.data.msg, success.data.status)
                    if (success.data.status == 1) {
                        dispatcher(
                            login({
                                user: success.data.user,
                                token: success.data.token
                            })
                        );
                        navigator('/')
                        axios.post('http://localhost:5000/user/move-to-cart',
                            {
                                cartData,
                                userId: success.data.user._id
                            }
                        ).then(
                            (success) => {
                                if (success.data.status) {
                                    const data = success.data.userCart.map(
                                        (item) => {
                                            return {
                                                pId: item.product_id,
                                                qty: item.quantity
                                            }
                                        }
                                    )
                                    dispatcher(dbToCart({ data, total: success.data.total }))
                                }
                            }
                        ).catch(
                            () => {

                            }
                        )
                    } else {
                        setError(success.data.msg)
                    }
                }
            ).catch(
                (err) => {
                    setError("Client side error")
                }
            )
            setEmail('');
            setPassword('')
            setError('')
        } catch (error) {
            console.log(error.message);

            setError("Login failed. Please try again.")
        }
    };

    return (
        <>

            <div className="flex relative flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className='absolute top-10 '>
                    <img src="images/iSHOP Logo.svg" alt="" />
                </div>
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                    {error && <p className='mb-4 text-red-500'>{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className='relative'>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <FaEyeSlash onClick={() => setShowPassword(false)} className={`absolute hover:text-gray-500 cursor-pointer z-10 top-1/2 right-3 ${showpassword ? "block" : 'hidden'} `} fontSize={27} />
                            <FaEye onClick={() => setShowPassword(true)} className={`absolute top-1/2 hover:text-gray-500 cursor-pointer right-3 ${showpassword ? "hidden" : 'block'}  `} fontSize={26} />
                            <input
                                type={showpassword == true ? 'text' : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-[#ea8186] rounded-lg hover:bg-[#e8455a]"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="relative w-full  p-3 text-gray-600">
                        <hr className='border-[1px]' />
                        <div className='absolute  top-0 left-1/3  bg-white px-1 '>
                            New to iShop?
                        </div>
                    </div>
                    <div onClick={() => navigator('/register')} className=' border text-center p-1 rounded-xl shadow hover:bg-gray-50 cursor-pointer border-gray-300 hover:shadow-lg '>
                        Register here

                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
