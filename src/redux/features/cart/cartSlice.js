import { createSlice } from "@reduxjs/toolkit"
import { message } from "antd";

const KEY_CARTS_LIST = "key_cart_list"
const initialState = {
    carts: JSON.parse(localStorage.getItem(KEY_CARTS_LIST)) || [],
}
const cartSlice = createSlice({
    name: "carts",
    initialState: initialState,
    reducers: {
        actAddProductToCarts: (state, action) => {
            const product = action.payload;
            const existedItemIndex = state.carts.findIndex(
                (cart) => cart.id === product.id
            );
            // nếu trùng id => + quantity
            if (existedItemIndex > -1) {
                state.carts[existedItemIndex].quantity += product.quantity;
            } else {
                state.carts.push({ ...product });
            }
            localStorage.setItem(KEY_CARTS_LIST, JSON.stringify(state.carts));
            message.success("Thêm vào giỏ hàng thành công!");
        },
        actDeleteProductInCarts: (state, action) => {
            state.carts = state.carts.filter((cart) => cart.id !== action.payload);
            localStorage.setItem(KEY_CARTS_LIST, JSON.stringify(state.carts));
            message.success("Xoá sản phẩm thành công!");
        },
        actUpdateQuantityOfProduct: (state, action) => {
            const { id, quantity } = action.payload;
            const existedItemIndex = state.carts.findIndex((item) => item.id === id);
            state.carts[existedItemIndex].quantity = quantity;
            localStorage.setItem(KEY_CARTS_LIST, JSON.stringify(state.carts));
        },
    }
})
export const { actAddProductToCarts, actDeleteProductInCarts, actUpdateQuantityOfProduct } = cartSlice.actions
export const cartReducer = cartSlice.reducer