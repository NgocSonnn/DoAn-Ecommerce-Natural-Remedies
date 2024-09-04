import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../features/product/productSlice";
import { cartReducer } from "../features/cart/cartSlice";
import { userReducer } from "../features/user/userSlice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        carts: cartReducer,
        user: userReducer
    }
}) 