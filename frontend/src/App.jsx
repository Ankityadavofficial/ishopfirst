import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WebsiteLayout from './pages/website/Layout'
import AdminLayout from './pages/admin/Layout'
import Home from './pages/website/Home'
import Store from './pages/website/Store'
import Dashboard from './pages/admin/Dashboard'
import CategoryView from './pages/admin/Category/View'
import CategoryAdd from './pages/admin/Category/Add'
import CategoryEdit from './pages/admin/Category/Edit'
import ColorView from './pages/admin/Color/View'
import ColorAdd from './pages/admin/Color/Add'
import ProductView from './pages/admin/Product/View'
import ProductAdd from './pages/admin/Product/Add'
import ProductEdit from './pages/admin/Product/Edit'
import AdminLogin from "./pages/admin/Login"
import AdminView from './pages/admin/Admin/View'
import AdminAdd from './pages/admin/Admin/Add'
import AdminEdit from './pages/admin/Admin/Edit'
import AccessoriesView from './pages/admin/Accessories/View'
import AccessoriesEdit from './pages/admin/Accessories/Edit'
import AccessoriesAdd from './pages/admin/Accessories/Add'
import { useDispatch } from 'react-redux'
import { lsToCart } from './reducers/Cart'
import LoginPage from './pages/website/Login'
import { login } from './reducers/User'
import CheckOut from './pages/website/CheckOut'
import ThankYou from './pages/website/ThankYou'
import MyProfile from './pages/website/MyProfile'
import ProductDetails from './pages/website/ProductDetails'
import Register from './pages/website/Register'
import MyOrders from './pages/website/MyOrders'

export default function App() {
    const dispatcher = useDispatch();

    useEffect(
        () => {
            dispatcher(lsToCart());
            const lsUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            if (lsUser != undefined) {
                dispatcher(
                    login(
                        {
                            user: JSON.parse(lsUser),
                            token: token
                        }
                    )
                )
            }
        }, []
    )

    const routes = createBrowserRouter(
        [
            {
                path: "",
                element: <WebsiteLayout />,
                children: [
                    {
                        path: "/:category_slug?",
                        element: <Home />
                    },
                    {
                        path: "/store/:category_slug?",
                        element: <Store />
                    },
                    {
                        path: '/my-profile/:tab?',
                        element: <MyProfile />
                    },
                    {
                        path: '/my-orders',
                        element: <MyOrders />
                    },
                    {
                        path: '/checkout',
                        element: <CheckOut />
                    },
                    {
                        path: '/product-details/:prod_id',
                        element: <ProductDetails />
                    },
                    {
                        path: "/thank-you/:order_id",
                        element: <ThankYou />
                    }
                ]
            },
            {
                path: "/admin",
                element: <AdminLayout />,
                children: [
                    {
                        path: "",
                        element: <Dashboard />
                    },
                    {
                        path: "category",
                        element: <CategoryView />
                    },
                    {
                        path: "category/add",
                        element: <CategoryAdd />
                    },
                    {
                        path: "category/edit/:id",
                        element: <CategoryEdit />
                    },
                    {
                        path: "color",
                        element: <ColorView />
                    },
                    {
                        path: "color/Add",
                        element: <ColorAdd />
                    },
                    {
                        path: 'product',
                        element: <ProductView />
                    },
                    {
                        path: 'product/add',
                        element: <ProductAdd />
                    },
                    {
                        path: 'product/edit/:id',
                        element: <ProductEdit />
                    },
                    {
                        path: "accessories",
                        element: <AccessoriesView />
                    },
                    {
                        path: "accessories/add",
                        element: < AccessoriesAdd />
                    },
                    {
                        path: "accessories/edit/:id",
                        element: <AccessoriesEdit />
                    },
                    {
                        path: "admin-lists",
                        element: <AdminView />
                    },
                    {
                        path: "admin-lists/add",
                        element: <AdminAdd />
                    },
                    {
                        path: "admin-lists/edit/:id",
                        element: <AdminEdit />
                    },

                ]
            },
            {
                path: "/admin/login",
                element: <AdminLogin />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    )
    return (
        <RouterProvider router={routes} />
    )
}
