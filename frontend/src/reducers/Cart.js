import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const cartSlice = createSlice(
    {
        name: "Cart",
        initialState: {
            data: [],
            total: 0
        },
        reducers: {
            dbToCart(currentState, { payload }) {
                currentState.data = payload.data
                currentState.total = Number(payload.total)
                localStorage.setItem("cart", JSON.stringify(currentState));
            },
            addToCart(currentState, { payload }) {
                const found = currentState.data.find(d => d.pId == payload.product_id);
                if (found) {
                    found.qty++;
                } else {
                    currentState.data.push({ pId: payload.product_id, qty: 1 })
                }
                currentState.total += Number(Math.round(payload.price));
                localStorage.setItem("cart", JSON.stringify(currentState))
            },

            removeFromCart(currentState, { payload }) {
                const lsCart = localStorage.getItem('cart');
                const cart = JSON.parse(lsCart);
                const lsTotal = cart.total;
                if (cart && cart.data && lsTotal) {
                    const found = cart.data.find(d => d.pId == payload.pId)
                    const updatedData = cart.data.filter(d => d.pId !== payload.pId);
                    const updataTotal = Number(lsTotal) - Number(payload.price * found.qty)
                    currentState.data = updatedData;
                    currentState.total = updataTotal
                } else {
                    currentState.data = []
                    currentState.total = 0
                }
                localStorage.setItem('cart', JSON.stringify(currentState));
            },

            emptyCart(currentState) {
                currentState.data = [];
                currentState.total = 0;
                localStorage.removeItem('cart')
            },

            changeQty(currentState, { payload }) {
                const found = currentState.data.find(d => d.pId == payload.pId);
                if (found.qty > payload.new_qty) {
                    currentState.total -= Number(Math.round(payload.price))
                } else {
                    currentState.total += Number(Math.round(payload.price))
                }
                found.qty = payload.new_qty;
                localStorage.setItem("cart", JSON.stringify(currentState))
            },

            lsToCart(currentState) {
                const lsCart = localStorage.getItem('cart');
                const cart = JSON.parse(lsCart)
                if (lsCart != undefined) {
                    currentState.data = cart.data;
                    currentState.total = cart.total;
                }

            }
        }
    }
)

export const { lsToCart, dbToCart, addToCart, changeQty, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer