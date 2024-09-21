import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { checkOutApis } from "../../../apis/checkOutApis"
import { message } from "antd"

const initialState = {
    checkOutBill: [],
}
export const actFetchAllCheckOutBill = createAsyncThunk("checkOut/actFetchAllCheckOutBill", async (params) => {
    const response = await checkOutApis.getAllCheckOutBill({ params: params })
    return response
})
export const actAddBill = createAsyncThunk("checkOut/actAddBill", async (bill) => {
    const response = await checkOutApis.addBill(bill)
    return response
})
const checkOutSlice = createSlice({
    name: "checkOut",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actFetchAllCheckOutBill.fulfilled, (state, action) => {
            state.checkOutBill = action.payload
        })
        builder.addCase(actAddBill.fulfilled, (state, action) => {
            state.checkOutBill = action.payload;
            message.success("Kiểm tra đơn hàng của bạn trong lịch sử mua hàng!")
        })
    }

})
export const checkOutReducer = checkOutSlice.reducer