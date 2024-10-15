import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../features/product/productSlice";
import { cartReducer } from "../features/cart/cartSlice";
import { userReducer } from "../features/user/userSlice";
import { checkOutReducer } from "../features/checkOut/checkOutSlice";
import { orderReducer } from "../features/order/orderSlice";
import { commentReducer } from "../features/comment/commentSlice";
import { wishListReducer } from "../features/wishList/wishListSlice";
import { couponReducer } from "../features/coupons/couponsSlice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        carts: cartReducer,
        user: userReducer,
        checkOut: checkOutReducer,
        order: orderReducer,
        comment: commentReducer,
        wishLists: wishListReducer,
        coupons: couponReducer
    }
}) 