import axios from 'axios';
import React, { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { fetchAdminList } from '../reducers/AdminList';


const Context = createContext();
export default function Main(props) {
    const notify = (msg, status) => toast(msg, { type: status ? "success" : "warning" });
    const [category, setCategory] = useState([]);
    const [categoryImageBaseUrl, setCatBaseUrl] = useState("");
    const [color, setColor] = useState([]);
    const [product, setProduct] = useState([]);
    const [productImageBaseUrl, setProBaseUrl] = useState('');
    // const dispatcher = useDispatch()
    const [adminList, setAdminList] = useState([]);
    const [accessories, setAccessories] = useState([]);
    const [accessImageUrl, setAccIMgUrl] = useState('');
    const [address, setAddress] = useState([])
    const [orders, setOrders] = useState([])

    const API_BASE_URL = 'http://localhost:5000';
    const CATEGORY_URL = '/category';
    const COLOR_URL = "/color";
    const PRODUCT_URL = "/product";
    const ACCESSORIES_URL = "/accessories";
    const ADMIN_LIST_URL = "/admin";
    const ADDRESS_URL = '/address';
    const USER_URL = '/user'
    const ORDER_URL = '/order'


    const fetchOrders = (id) => {
        if (id) {
            let API = API_BASE_URL + ORDER_URL + `/${id}`
            axios.get(API)
                .then(
                    (success) => {
                        if (success.data.status) {
                            setOrders(success.data.orders)
                        }
                    }
                ).catch(
                    (error) => {
                        setOrders([]);

                    }
                )
        }
    }

    const fetchAddress = (id) => {
        if (id) {
            let API = API_BASE_URL + USER_URL + ADDRESS_URL + `/${id}`
            axios.get(API)
                .then(
                    (success) => {
                        if (success.data.status) {
                            setAddress(success.data.user)
                        }
                    }
                ).catch(
                    (error) => {
                        setAddress([]);

                    }
                )
        }
    }

    const fetchAdmin = (id = null) => {
        let API = API_BASE_URL + ADMIN_LIST_URL;
        if (id) {
            API += `/${id}`
        }
        axios.get(API)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setAdminList(success.data.admin)
                        // dispatcher(fetchAdminList({ adminList: success.data.adminList }))
                    } else {
                        // dispatcher(fetchAdminList({ adminList: [] }))
                        setAdminList([]);
                    }
                }
            ).catch(
                () => {
                    // dispatcher(fetchAdminList({ adminList: [] }))
                    setAdminList([]);
                }
            )
    }

    const fetchProduct = (id = null, category_slug = null, price_start = null, price_end = null, color_id = null) => {
        const query = new URLSearchParams();
        if (category_slug != null) {
            query.append("category_slug", category_slug)
        }
        if (color_id != null) query.append('color_id', color_id)
        if (price_start != null) query.append("price_start", price_start)
        if (price_end != null) query.append("price_end", price_end)
        let API = API_BASE_URL + PRODUCT_URL;
        if (id) {
            API += `/${id}`
        }
        API += `?${query}`;
        axios.get(API)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setProduct(success.data.product);
                        setProBaseUrl(success.data.image_base_url)
                    } else {
                        setProduct([]);
                    }
                }
            ).catch(
                (error) => {
                    setProduct([]);
                }
            )
    }

    const fetchCategory = (id = null) => {
        let API = API_BASE_URL + CATEGORY_URL;
        // localhost://5000/category
        if (id) {
            API += `/${id}`;
            //localhost://5000/category/id
        }
        axios.get(API)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setCategory(success.data.category)
                        setCatBaseUrl(success.data.image_base_url)
                    } else {
                        setCategory([]);
                    }
                }
            ).catch(
                (error) => {
                    setCategory([]);

                }
            )
    }

    const fetchColor = (id = null) => {
        let API = API_BASE_URL + COLOR_URL;
        if (id) {
            API += `/${id}`;
        }
        axios.get(API)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setColor(success.data.color)
                    } else {
                        setColor([])
                    }
                }
            ).catch(
                (error) => {
                    setColor([]);
                }
            )
    }

    const fetchAccessories = (id = null, category_slug = null, price_start = null, price_end = null) => {
        const query = new URLSearchParams();
        if (category_slug != null) query.append("category_slug", category_slug);
        if (price_start != null) query.append("price_start", price_start)
        if (price_end != null) query.append("price_end", price_end)
        let API = API_BASE_URL + ACCESSORIES_URL;
        if (id) {
            API += `/${id}`
        }
        API += `?${query}`;
        axios.get(API)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setAccessories(success.data.accessorie)
                        setAccIMgUrl(success.data.image_base_url)
                    } else {
                        setAccessories([]);
                    }
                }
            ).catch(
                () => {
                    setAccessories([]);
                }
            )
    }

    return (
        <Context.Provider value={{ notify, API_BASE_URL, CATEGORY_URL, category, fetchCategory, categoryImageBaseUrl, COLOR_URL, fetchColor, color, PRODUCT_URL, fetchProduct, productImageBaseUrl, product, ADMIN_LIST_URL, fetchAdmin, adminList, ACCESSORIES_URL, fetchAccessories, accessories, accessImageUrl, fetchAddress, address, fetchOrders,orders }}>
            <ToastContainer />
            {props.children}
        </Context.Provider>
    )
}
export { Context };