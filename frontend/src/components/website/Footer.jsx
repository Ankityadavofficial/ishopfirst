import React from 'react'
import Conatiner from '../Conatiner'

export default function Footer() {
  return (
    <>
      <Conatiner className="py-10 border-t-2  border-b-2 grid grid-cols-3 gap-16 ">
        <div className=' flex flex-col gap-3'>
          <img width={100} src="images/ishop.svg" alt="" />
          <span className='text-sm text-justify'><p className='font-semibold text-[16px]' >Welcome to the Ultimate iPhone Destination!</p>
            Our website is your one-stop shop for everything iPhone. From the latest models to exclusive accessories, we provide a seamless experience for tech enthusiasts and Apple lovers alike.</span>
        </div>
        <div className=' flex flex-col gap-3'>
          <span className='text-lg text-justify font-semibold' >Follow Us</span>
          <span className='text-sm text-justify'>Following us keeps you at the forefront of the tech world. By staying connected, you'll be the first to know about the latest iPhone launches, updates, and features. Plus, with personalized support at your fingertips, we’re here to assist you whenever you need. Join our growing community and stay connected to everything iPhone! 📱✨</span>
          <div className='flex gap-5'>
            <img width={8} src="images/facebook.svg" className='cursor-pointer' alt="" />
            <img width={15} src="images/twitter.svg" className='cursor-pointer' alt="" />
          </div>
        </div>
        <div className=' flex flex-col gap-3'>
          <span className='text-lg text-justify font-semibold' >Contact Us</span>
          <span className='text-sm  text-justify'>
            iShop: address @building 124 <br />
            Call us now: 0123-456-789 <br />
            Email: support@whatever.com</span>
        </div>
      </Conatiner>

      <Conatiner className="grid py-11 grid-cols-6">
        <div className=''>
          <span className='text-lg font-semibold'>Infomation</span>
          <ul className='text-[#595757] mt-6 flex flex-col space-y-1 text-sm'>
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className=''>
          <span className='text-lg font-semibold'>Service</span>
          <ul className='text-[#595757] mt-6 flex flex-col space-y-1  text-sm'>
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className=''>
          <span className='text-lg font-semibold'>Extras</span>
          <ul className='text-[#595757] mt-6 flex flex-col space-y-1 text-sm'>
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className=''>
          <span className='text-lg font-semibold'>My Account</span>
          <ul className='text-[#595757] mt-6 flex flex-col space-y-1 text-sm'>
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className=''>
          <span className='text-lg font-semibold'>Userful Links</span>
          <ul className='text-[#595757] mt-6 flex flex-col space-y-1 text-sm'>
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className=''>
          <span className='text-lg font-semibold'>Userful Links</span>
          <ul className='text-[#595757] mt-6 flex flex-col space-y-1 text-sm'>
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </Conatiner>

      <div className=' border-t-2 mb-8'  >
        <Conatiner className='flex justify-end gap-5 py-7'>
          <img width={38} src="images/Western_union.svg" alt="" />
          <img width={38} src="images/master_card.svg" alt="" />
          <img width={38} src="images/Paypal.svg" alt="" />
          <img width={38} src="images/visa.svg" alt="" />
        </Conatiner>
      </div>
    </>
  )
}
