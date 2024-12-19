import React from 'react'
import SideBar from '../../components/admin/SideBar'
import Header from '../../components/admin/Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='grid grid-cols-5 bg-gray-50'>
      <SideBar />
      <div className=" col-span-4 min-h-[100vh]">
        <Header />
        <Outlet />
      </div>

    </div>
  )
}
