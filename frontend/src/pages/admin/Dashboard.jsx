import React from 'react'

export default function Dashboard() {
    return (
        <div className='m-5'>
            <div className='text-xl my-2 border-b pb-2' >Overview</div>
            <div className='grid grid-cols-4 gap-3'>
                <div className='bg-gray-300 flex  justify-center items-center flex-col h-[150px] rounded-md'>
                    <h4 className='font-bold text-[60px]'>40</h4>
                    <h5 className='text-2xl'>Users</h5>
                </div>
                <div className='bg-gray-300 flex  justify-center items-center flex-col h-[150px] rounded-md'>
                    <h4 className='font-bold text-[60px]'>₹50,000</h4>
                    <h5 className='text-2xl'>Revenue</h5>
                </div>
                <div className='bg-gray-300 flex  justify-center items-center flex-col h-[150px] rounded-md'>
                    <h4 className='font-bold text-[60px]'>40</h4>
                    <h5 className='text-2xl'>Users</h5>
                </div>
                <div className='bg-gray-300 flex  justify-center items-center flex-col h-[150px] rounded-md'>
                    <h4 className='font-bold text-[60px]'>40</h4>
                    <h5 className='text-2xl'>Users</h5>
                </div>
            </div>
            <div className='text-xl my-2 border-b pb-2' >Charts</div>
        </div>
    )
}
