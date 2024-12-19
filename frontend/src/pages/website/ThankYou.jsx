import React from 'react';
import { useParams } from 'react-router-dom';

export default function ThankYou() {
    const { order_id } = useParams();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-gray-800">
            <div className="bg-white shadow-lg rounded-lg p-10 md:p-14 text-center">
                <div className="flex justify-center mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-20 h-20 text-green-500 animate-pulse"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
                    Thank You!
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-4">
                    Your order has been placed successfully. 🎉
                </p>
                <p className="text-lg text-gray-600 font-medium mb-8">
                    We appreciate your trust in us. Your order ID is:
                    <span className="text-blue-600 font-semibold"> {order_id}</span>
                </p>
                <p className="text-sm text-gray-500 italic mb-8">
                    You will receive an email confirmation shortly.
                </p>
                <button
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
                    onClick={() => window.location.href = "/my-orders"}
                >
                    View Your Orders
                </button>
                <div className="mt-8">
                    <p className="text-sm text-gray-500">
                        Need help? <a href="/support" className="text-blue-500 underline">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
