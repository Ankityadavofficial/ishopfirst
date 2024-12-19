import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context/Main'
import { FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import axios, { formToJSON } from 'axios';

export default function View() {
  const { fetchAccessories, accessories, accessImageUrl, API_BASE_URL, ACCESSORIES_URL, notify ,fetchProduct, } = useContext(Context);

  useEffect(
    () => {
      fetchAccessories();
      fetchProduct();
    }, []
  )


  const deleteData = (acc_id, accImg, othImg) => {
    axios.delete(API_BASE_URL + ACCESSORIES_URL + `/delete/${acc_id}/${accImg}`)
      .then(
        (success) => {
          if (success.data.status == 1) {
            fetchAccessories()
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
                  to="/admin/accessories"
                  className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Accessories
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="relative overflow-x-auto bg-white mx-8 my-5 shadow rounded-lg">
        <div className='flex items-center justify-between p-5'>
          <div className='font-bold'>All Accessories List</div>
          <Link to={'/admin/accessories/add'} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center px-10 py-2">
            Add
          </Link>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs border text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=" text-start px-6 py-5">
                Accessories Image
              </th>
              <th scope="col" className=" text-start px-6 py-5">
                Accessories Name
              </th>
              <th scope="col" className=" text-start px-6 py-5">
                Accessories Slug
              </th>
              <th scope="col" className=" text-start px-6 py-5">
                Status
              </th>
              <th scope="col" className=" text-start px-6 py-5">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              Array.isArray(accessories)
              &&
              accessories.map(
                (acc, i) => {
                  return (
                    <tr key={i} className="bg-white border-b hover:bg-gray-50 ">
                      <td className="px-6 py-2">
                        <div className=' flex justify-start'>
                          <img width={90} className='border rounded-[15px] bg-blue-50 p-2' src={`${API_BASE_URL}${accessImageUrl}/${acc.main_image}`} alt="" />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium  text-gray-900 whitespace-wrap dark:text-white"
                      >
                        <div className=' flex  justify-start '>
                          {acc.name}
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <div className=' flex justify-start'>
                          {acc.slug}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className=' flex justify-start'>
                          {
                            acc.status
                              ? <button onClick={() => changeStatus(acc._id, false)}>
                                Active
                              </button>
                              : <button onClick={() => changeStatus(acc._id, true)}>
                                Inactive
                              </button>
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className=' flex justify-start'>
                          <div className='flex gap-3 text-[35px]'>
                            <FaRegTrashAlt onClick={() => deleteData(acc._id, acc.main_image, acc.other_images)} className='cursor-pointer w-12 text-blue-600 bg-blue-50 rounded-md p-[8px]  hover:bg-blue-600 hover:text-white' />
                            <Link to={`/admin/accessories/edit/${acc._id}`}>
                              <AiOutlineEdit className='cursor-pointer text-blue-600 bg-blue-50 rounded-md  w-12  p-[7px] hover:bg-blue-600 hover:text-white' />
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                }
              )
            }

          </tbody>
        </table>



      </div>

    </div>
  )
}
