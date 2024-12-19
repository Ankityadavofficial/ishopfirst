import React, { useContext, useEffect, useRef, useState } from 'react'
import Conatiner from '../../components/Conatiner'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select';
import { IoCloseSharp } from 'react-icons/io5';
import axios from 'axios';
import countryList from 'react-select-country-list';
import { Context } from '../../Context/Main';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../../reducers/Cart';
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { MdDelete } from "react-icons/md";

export default function CheckOut() {
    const { error, isLoading, Razorpay } = useRazorpay();
    const { notify, fetchAddress, address, fetchProduct } = useContext(Context)
    const user = useSelector(store => store.user)
    const cart = useSelector(store => store.cart)
    const [addopen, setAddOpen] = useState(false);
    const [payment_type, setPaymentType] = useState(1);
    // 0 -> COD , 1 -> Prepaid
    const [user_address, setUserAddress] = useState(0)
    const navigator = useNavigate();
    const dispatcher = useDispatch()

    const placeOrder = () => {
        const data = {
            shipping_details: address[user_address],
            order_total: cart.total + (payment_type == 0 ? 5 : 0),
            payment_type,
            user_id: user.data._id
        }
        axios.post('http://localhost:5000/order/place-order', data)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        if (payment_type == 0) {
                            navigator(`/thank-you/${success.data.order_id}`)
                            dispatcher(emptyCart())
                        } else {
                            showPaymentPopUp(success.data)
                            // Open razor pay popup
                        }
                    }
                }
            ).catch(
                (error) => {
                    console.log(error);

                }
            )
    }


    const showPaymentPopUp = ({ order_id, razorpayOrderId }) => {
        const options = {
            key: import.meta.env.RAZORPAY_KEY_ID,
            currency: "INR",
            name: "Ishop",
            image: "http://localhost:5173/images/iSHOP%20Logo.svg",
            order_id: razorpayOrderId, // Generate order_id on server
            handler: (response) => {
                console.log(response);
                alert("Payment Successful!");
                axios.post(
                    "http://localhost:5000/order/payment-success",
                    {
                        razorpay_response: response,
                        db_order_id: order_id
                    }

                ).then(
                    (success) => {
                        if (success.data.status == 1) {
                            navigator(`/thank-you/${success.data.order_id}`);
                            dispatcher(emptyCart());
                        }
                    }
                )
                    .catch(
                        () => {

                        }
                    )
            },
            prefill: {
                name: user.data?.name,
                email: user.data?.email,
            },
            theme: {
                color: "#F37254",
            },
        };

        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
        razorpayInstance.on("payment.failed", function (response) {
            axios.post(
                "http://localhost:5000/order/payment-failed",
                {
                    razorpay_response: response,
                    db_order_id: order_id
                }

            ).then(
                (success) => {
                    if (success.data.status == 1) {

                    }
                }
            )
                .catch(
                    () => {

                    }
                )
        })
    };

    useEffect(
        () => {
            fetchProduct()
            fetchAddress(user.data?._id)
        }, [user.data != null]
    )


    // console.log(user.data?.shipping_address.map(
    //     (a, i) => {
    //         return a
    //     }
    // ));

    const [formData, setFormData] = useState({
        country: '',  // Store full country name
        name: '',
        contact: '',
        pincode: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: '',
        district: '',
        state: '',
    });

    const [options] = useState(countryList().getData()); // Get country list options
    const [isFetching, setIsFetching] = useState(false);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });

        // Trigger auto-populate logic if pincode is updated
        if (field === 'pincode' && value.length === 6) {
            fetchPincodeDetails(value, formData.country);
        }
    };

    const handleCountryChange = (selectedOption) => {
        const countryName = selectedOption.label; // Get the full country name
        setFormData((prevData) => ({ ...prevData, country: countryName }));
        console.log('Selected Country:', countryName); // Log the full country name to the console
    };

    const fetchPincodeDetails = async (pincode, country) => {
        if (!country) {
            alert('Please select a country first!');
            return;
        }
        setIsFetching(true);
        try {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = response.data[0];
            if (data && data.Status === 'Success') {
                const details = data.PostOffice[0];
                setFormData((prevData) => ({
                    ...prevData,
                    city: details.Name,
                    district: details.District,
                    state: details.State,
                }));
            } else {
                alert('Invalid pincode! Please enter a valid Indian pincode.');
            }
        } catch (error) {
            console.error('Error fetching pincode details:', error);
            alert('Could not fetch location details for this pincode. Please try again.');
        } finally {
            setIsFetching(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        document.body.style.overflow = ''
        // if (onSubmit) onSubmit(formData); // Pass data back to the parent component or API call
        axios.post(`http://localhost:5000/user/address/${user.data._id}`,
            formData
        )
            .then(
                (success) => {
                    if (success.data.status) {
                        setAddOpen(false)
                        fetchAddress(user.data?._id)
                    }
                    notify()
                }
            ).catch(
                () => {

                }
            )

    };

    // const newAddress = (id) => {
    //     console.log(id)
    //     fetchAddress()
    //     setAddOpen(true)
    //     document.body.style.overflow = 'hidden'
    // }

    const deleteAddress = (index) => {
        axios.delete(`http://localhost:5000/user/delete-address/${index}/${user.data._id}`)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        fetchAddress(user.data._id);
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
        <>
            <Conatiner className='grid grid-cols-2 gap-3 py-4'>
                <div>
                    <div className='p-3'>
                        <div className='text-center font-bold mb-3'>({address.length}) Save Address</div>
                        <button onClick={() => {
                            setAddOpen(true)
                            document.body.style.overflow = 'hidden'
                        }} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base  text-center w-full p-2">
                            + Add New Address
                        </button>
                        {
                            address.map(
                                (sa, i) => {
                                    return <div key={i} className='my-3 p-3 relative bg-gray-100 flex gap-2'>
                                        <input onClick={() => setUserAddress(i)} defaultChecked={user_address == i ? true : false} type="radio" name='address' />
                                        <MdDelete fontSize={25} onClick={() => deleteAddress(i)} className='absolute cursor-pointer top-2 right-2' />
                                        <label>
                                            <b>{sa.name}</b>, <br />
                                            {sa.addressLine1} , <br />
                                            {sa.landmark} , <br />
                                            {sa.addressLine2} , <br />
                                            {sa.district} {sa.state} {sa.pincode} , <br />
                                            {sa?.country}, <br />
                                            Phone number: {sa?.contact}
                                        </label>
                                    </div>
                                }
                            )
                        }

                    </div>
                </div>
                <div className='shadow-lg rounded p-3 bg-white h-[350px]'>
                    <div className="flex gap-3 text-lg">
                        <label htmlFor="cod">COD:</label>
                        <input onClick={() => setPaymentType(0)} type="radio" name='payment_type' id='cod' />
                        <label htmlFor="prepaid">Prepaid:</label>
                        <input defaultChecked type="radio" onClick={() => setPaymentType(1)} name='payment_type' id='prepaid' />
                    </div>
                    <div className='my-4 text-xl'>
                        Cart Value: $ {cart?.total?.toLocaleString()} <br />
                        Extra: $ {payment_type ? '0' : '5'} <br />
                        <input type="text" className='p-3 border my-2' placeholder='Enter coupon code' /> <br />
                        Discount: $ 0 <br />
                        Total: ${(Number(cart?.total) + Number(payment_type ? '0' : '5')).toLocaleString()}
                    </div>
                    <button onClick={placeOrder} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base  text-center w-full p-2">
                        Place Order
                    </button>
                </div>
            </Conatiner>



            <div onClick={() => {
                setAddOpen(false)
                document.body.style.overflow = ''
            }} className={`w-full h-full py-5 bg-[#000000c3] z-[99999]  top-0 ${addopen ? 'fixed' : 'hidden'} `}>
            </div>

            <div className={`w-[50%]  h-[90vh] shadow-lg z-[99999] rounded-lg  bg-white fixed top-10 left-[25%] p-5 duration-[10000ms] ${addopen ? 'fixed' : 'hidden'} `}>
                <div className='p-2 cursor-pointer text-2xl'>
                    <IoCloseSharp className='absolute' onClick={() => {
                        setAddOpen(false)
                        document.body.style.overflow = ''
                    }} />
                </div>
                <h2 className="text-2xl font-bold text-center mb-3">Shipping Address (India)</h2>

                <form
                    className="mx-auto p-6"
                    onSubmit={handleSubmit}
                >
                    <div className='grid grid-cols-2 gap-3'>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Country</label>
                            <Select
                                options={options}
                                value={options.find((option) => option.label === formData.country)}
                                onChange={handleCountryChange}  // Update with full country name
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder="Select your country"
                            />
                        </div>

                        {/* Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        {/* Contact */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Contact</label>
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter your contact number"
                                maxLength={10}
                                required
                            />
                        </div>


                        {/* Pincode */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter your pincode"
                                maxLength={6}
                                required
                            />
                            {isFetching && (
                                <p className="text-blue-500 text-sm mt-1">Fetching location details...</p>
                            )}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        {/* Address Line 1 */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Address Line 1</label>
                            <input
                                type="text"
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter your address"
                                required
                            />
                        </div>

                        {/* Address Line 2 */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Address Line 2</label>
                            <input
                                type="text"
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Apartment, suite, etc. (Optional)"
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        {/* Landmark */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Landmark</label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter landmark"
                                required
                            />
                        </div>


                        {/* City */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">City/Town</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter your city"
                                readOnly
                                required
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        {/* District */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">District</label>
                            <input
                                type="text"
                                name="district"
                                value={formData.district}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter your district"
                                readOnly
                                required
                            />
                        </div>

                        {/* State */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">State</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter your state"
                                readOnly
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 mt-5 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        disabled={isFetching}
                    >
                        Submit
                    </button>
                </form>


            </div>

        </>
    )
}
