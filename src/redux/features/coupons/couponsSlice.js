import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { couponsApis } from "../../../apis/couponsApis"

const initialState = {
    coupons: [],
    discount: null
}

export const actFetchAllCoupons = createAsyncThunk("coupons/actFetchAllCoupons", async () => {
    const response = await couponsApis.getAllCoupons()
    return response.data
})

export const actUpdateCoupons = createAsyncThunk("coupons/actUpdateCoupons", async (id) => {
    const response = await couponsApis.updateCoupons(id)
    return response
})
const couponSlice = createSlice({
    name: "coupons",
    initialState: initialState,
    reducers: {
        setDiscountAmount: (state, action) => {
            state.discount = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actFetchAllCoupons.fulfilled, (state, action) => {
            state.coupons = action.payload
        })
        builder.addCase(actUpdateCoupons.fulfilled, (state, action) => {
            const updatedCoupon = action.payload;
            const couponIndex = state.coupons.findIndex(coupon => coupon.id === updatedCoupon.id);
            if (couponIndex !== -1) {
                state.coupons[couponIndex].quantity -= 1;
            }
        });
    }
})
export const { setDiscountAmount } = couponSlice.actions
export const couponReducer = couponSlice.reducer