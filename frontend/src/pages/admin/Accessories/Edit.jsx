import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../../Context/Main';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import axios from 'axios';


export default function Edit() {
  const { product, fetchProduct, fetchColor, accessories, color, fetchAccessories, notify, API_BASE_URL, ACCESSORIES_URL, accessImageUrl } = useContext(Context)
  const nameRef = useRef();
  const slugRef = useRef();
  const originalRef = useRef();
  const discountRef = useRef();
  const finalRef = useRef();
  const { id } = useParams()
  const navigator = useNavigate()
  const [accessProduct, setAccessProduct] = useState(null)
  const [editorvalue, setEditorValue] = useState('')
  const [accesscolors, setAccessColors] = useState(null)


  const handleChange = (content, delta, source, editor) => {
    setEditorValue(editor.getHTML());
  };
  useEffect(
    () => {
      fetchColor();
      fetchProduct();
    }, []
  )

  useEffect(
    () => {
      if (id != null) {
        fetchAccessories(id)
      }
    }, [id]
  )

  const getSlug = () => {
    slugRef.current.value = nameRef.current.value
  }

  const calFinalPrice = () => {
    const originalPrice = originalRef.current.value;
    const discountPercent = discountRef.current.value;
    if (originalPrice > 1 && originalPrice != "") {
      if (discountPercent != "" && discountPercent < 100) {
        const finalPrice = originalPrice - (originalPrice * discountPercent) / 100;
        finalRef.current.value = finalPrice;
      }
      else if (discountPercent >= 100) {
        notify("Dicount must be less then 100", 0)
      }
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', nameRef.current.value.trim());
    formData.append('slug', slugRef.current.value.trim());
    formData.append('original_price', originalRef.current.value.trim());
    formData.append('discount_percent', discountRef.current.value.trim());
    formData.append('final_price', finalRef.current.value.trim());
    formData.append('accessories_product', JSON.stringify(accessProduct));
    formData.append('accessories_colors', JSON.stringify(accesscolors));
    formData.append('description', editorvalue);
    if (e.target.image.files.length != 0) {
      formData.append('accessories_image', e.target.image.files[0]);
    }
    for (let other_image of e.target.other_image.files) {
      formData.append('other_images', other_image);
    }

    axios.put(API_BASE_URL + ACCESSORIES_URL + "/update/" + id, formData)
      .then(
        (success) => {
          if (success.data.status == 1) {
            navigator('/admin/accessories')
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
    <div className='mt-5'>
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
                  className="ms-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Edit
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      </div>




      <div className="p-6 ">
        <h2 className="text-2xl font-bold mb-4 uppercase">Accessories edit</h2>
        <div className='grid grid-cols-7 gap-7'>


          <div className='col-span-2'>
            <div className='bg-white rounded-[15px] shadow-md p-7 '>
              <div className="border flex justify-center bg-blue-50 rounded-[15px]">
                <img className='w-[276px] h-[250px] py-7 px-2' src={`${API_BASE_URL}${accessImageUrl}/${accessories?.main_image}`} alt="" />
              </div>
              <div className='p-4'>
                <div className=' mb-2 '><span className='font-semibold text-xl pr-4'>{accessories?.name}</span><span className='text-[17px]'>({
                  accessories.product_id?.map(
                    (p, i) => {
                      return <span key={i}>{p.name}, </span>
                    }
                  )
                })</span> </div>

                <div className='mb-1'>Price:</div>
                <div className='mb-2'>
                  <span className='font-semibold text-lg text-[#5d7186] line-through'>${accessories.final_price}</span>
                  <span className='font-semibold text-lg ms-2'>${accessories.original_price}</span>
                  <span className='font-semibold text-sm text-[#5d7186] ms-2'>({accessories.discount_percentage}% Off)</span>
                </div>
                <div>Colors :</div>
                <div className='grid grid-cols-4 mt-2 gap-2'>{


                  accessories.colors?.length != undefined
                    ?
                    accessories.colors?.map(
                      (c, i) => {
                        return <div key={i} className='bg-gray-200 w-10 h-10 rounded-xl flex justify-center items-center'>
                          <div style={{ backgroundColor: [`${c.code}`] }} className="rounded-full w-5 h-5"></div>
                        </div>
                      }
                    )
                    :
                    <div className='col-span-4 font-semibold'>No colors</div>
                }</div>
              </div>
            </div>
          </div>
          <div className='col-span-5 '>
            <div className='bg-white rounded-[15px] shadow-md p-7 '>
              <form onSubmit={submitHandler} className='h-auto bg-white py-2 px-10 pb-7' encType="multipart/form-data">
                <div className="grid grid-cols-2 gap-3">
                  <div className="mb-6 ">
                    <label
                      className="block mb-2 text-sm text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      defaultValue={accessories.name}
                      name='name'
                      onChange={getSlug}
                      ref={nameRef}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-2 text-sm text-gray-900 dark:text-white"
                    >
                      Slug
                    </label>
                    <input
                      defaultValue={accessories.slug}

                      name='slug'
                      ref={slugRef}
                      readOnly
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="mb-6 ">
                    <label
                      className="block mb-2 text-sm text-gray-900 dark:text-white"
                    >
                      Original Price
                    </label>
                    <input
                      defaultValue={accessories.original_price}

                      name='original_price'
                      onChange={calFinalPrice}
                      ref={originalRef}
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                    />
                  </div>
                  <div className="mb-6 ">
                    <label
                      className="block mb-2 text-sm text-gray-900 dark:text-white"
                    >
                      Discount Percent
                    </label>
                    <input
                      defaultValue={accessories.discount_percentage}
                      name='discount_percent'
                      onChange={calFinalPrice}
                      ref={discountRef}
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-2 text-sm text-gray-900 dark:text-white"
                    >
                      Final Price
                    </label>
                    <input
                      defaultValue={accessories.final_price}

                      name='final_price'
                      readOnly
                      ref={finalRef}
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 ">
                  <div className="mb-6 ">
                    <label
                      className="block mb-2 text-sm text-gray-900 dark:text-white"
                    >
                      Select Product
                    </label>
                    <Select isMulti closeMenuOnSelect={false} onChange={(opt) => setAccessProduct(
                      opt.map(
                        (o) => {
                          return o.value
                        }
                      )
                    )} options={
                      product?.map(
                        (cat, i) => {
                          return {
                            value: cat._id,
                            label: cat.name
                          }
                        }
                      )
                    } />
                  </div>

                  <div className="mb-6 ">
                    <label
                      className="block mb-2 text-sm text-gray-900 dark:text-white"
                    >
                      Select Color
                    </label>
                    <Select isMulti closeMenuOnSelect={false} onChange={(opt) => setAccessColors(
                      opt.map(
                        (o) => {
                          return o.value
                        }
                      )
                    )} options={
                      color.map(
                        (cat, i) => {
                          return {
                            value: cat._id,
                            label: cat.name
                          }
                        }
                      )
                    } />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">

                  <div className="mb-6">
                    <label
                      className="block mb-2 text-sm text-gray-900 dark:text-white"
                    >
                      Image
                    </label>
                    <input
                      name='image'
                      type="file"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      className="block mb-2 text-sm text-gray-900 dark:text-white"
                    >
                      Other Image
                    </label>
                    <input
                      multiple
                      name='other_image'
                      type="file"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none "
                    />
                  </div>

                </div>

                <ReactQuill className='mb-6' value={editorvalue} onChange={handleChange} />

                <div className='flex justify-center'>
                  <button
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center px-36 py-3">
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>



    </div>
  )
}
