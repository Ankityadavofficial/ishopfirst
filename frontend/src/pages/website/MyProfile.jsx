import React, { useContext, useEffect, useState } from 'react';
import Conatiner from '../../components/Conatiner';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../Context/Main';

export default function MyProfile() {
    const user = useSelector(store => store.user)
    const [activeTab, setActiveTab] = useState(0);
    const { tab } = useParams();
    const navigator = useNavigate()
    useEffect(
        () => {
            switch (tab) {
                case undefined:
                    setActiveTab(0);
                    break;
                case "order":
                    setActiveTab(1);
                    break;
                case "address":
                    setActiveTab(2);
                    break;
                case "update-password":
                    setActiveTab(3);
                    break;
                default:
                    navigator('/not-found');
                    break;
            }
        }, [tab]
    )

    const tabs = [
        { id: 0, label: "Profile", link: "/my-profile" },
        { id: 1, label: "Orders", link: '/my-profile/order' },
        { id: 2, label: "Address", link: '/my-profile/address' },
        { id: 3, label: "Update Password", link: '/my-profile/update-password' },
    ];

    return (
        <Conatiner>
            <div className="flex bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200">
                {/* Tabs Sidebar */}
                <div className="flex flex-col w-1/4 bg-white">
                    <h2 className="text-xl font-bold text-center py-4 border-b bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                        My Profile
                    </h2>
                    {tabs.map((tab) => (
                        <Link to={tab.link}
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`p-4 text-left border-b hover:bg-blue-100 hover:scale-105 transition-all duration-300 ${activeTab === tab.id
                                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-md"
                                : "text-gray-700"
                                }`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-6 bg-white shadow-inner">
                    <h2 className="text-3xl font-bold text-blue-600 mb-6 transition-transform duration-300 transform hover:scale-105">
                        {tabs[activeTab].label}
                    </h2>
                    {activeTab === 0 && <ProfileForm user={user} />}
                    {activeTab === 1 && <OrdersList />}
                    {activeTab === 2 && <AddressForm user={user} />}
                </div>
            </div>
        </Conatiner>
    );
}

function ProfileForm({ user }) {

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <form className="max-w-4xl mx-auto p-6 bg-white " onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Edit User Details</h2>

            {/* User Information */}
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={user.data?.name}
                        className="w-full p-2 border rounded-md focus:outline-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={user.data?.email}
                        className="w-full p-2 border rounded-md focus:outline-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold">Contact</label>
                    <input
                        type="text"
                        name="contact"
                        defaultValue={user.data?.contact}
                        className="w-full p-2 border rounded-md focus:outline-blue-500"
                    />
                </div>
            </div>

            {/* Save Button */}
            <button
                type="submit"
                className="mt-6 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
                Save Changes
            </button>
        </form>
    );
}

function OrdersList() {
    const orders = [
        { id: 1, name: "Order #12345", status: "Delivered" },
        { id: 2, name: "Order #12346", status: "In Transit" },
        { id: 3, name: "Order #12347", status: "Pending" },
    ];

    return (
        <ul className="space-y-2">
            {orders.map((order) => (
                <li
                    key={order.id}
                    className="p-4 border rounded-md shadow-sm hover:shadow-md transition"
                >
                    <h3 className="font-semibold">{order.name}</h3>
                    <p className="text-gray-600">Status: {order.status}</p>
                </li>
            ))}
        </ul>
    );
}

function AddressForm({ user }) {
    const { address, fetchAddress } = useContext(Context);
    useEffect(
        () => {
            fetchAddress(user.data?._id)
        }, [user.data != null]
    )
    return (
        <div className='p-3 grid grid-cols-2 gap-3'>
            {
                address.map(
                    (sa, i) => {
                        return <div key={i} className='my-3 p-3 bg-gray-100 flex gap-2 rounded-lg'>
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
    );
}
