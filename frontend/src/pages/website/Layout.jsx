import React from 'react'
import Header from '../../components/website/Header'
import Footer from '../../components/website/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
