import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderApis } from "../../../apis/orderApis";
import { message } from "antd";

const initialState = {
    orders: [],
    order: {},
    isLoading: false,
    errors: {},
    isBought: false,
    pagination: {
        currentPage: 1,
        limitPerPage: 9,
        total: 8,
    },
    searchKey: "",
};

export const actFetchAllOrders = createAsyncThunk(
    "order/actFetchAllOrders",
    async (params = {}) => {
        const response = await orderApis.getAllOrders({ ...params, });
        return {
            data: response.data,
            total: response.headers.get('X-Total-Count')
        }
    }
);

export const actAddOrder = createAsyncThunk("order/actAddOrder", async (order) => {
    const response = await orderApis.addOrder(order);
    return response;
});

export const actFetchOrderById = createAsyncThunk(
    "order/actFetchOrderById", async (id) => {
        const response = await orderApis.getOrderById(id);
        return response.data
    }
);
export const actDeleteOderById = createAsyncThunk("order/actDeleteOderById", async (id) => {
    await orderApis.deleteOrder(id)
    return null

})

const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        setNewPage: (state, action) => {
            state.pagination.currentPage = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = true;
        },
        sendOrderSuccess: (state, action) => {
            state.orders.push(action.payload);
            message.success("Đặt hàng thành công! Success");
        },
        sendOrderFailure: (state, action) => {
            message.error("Đặt hàng thất bại! Failure");
        },
        clearOrder: (state, action) => {
            state.orders = [];
            state.order = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actFetchAllOrders.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(actFetchAllOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = {};
        });
        builder.addCase(actFetchAllOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.data;
            state.pagination.total = action.payload.total
        });

        builder.addCase(actAddOrder.fulfilled, (state, action) => {
            state.order = action.payload;
            state.orders.push(action.payload);
            message.success("Đặt hàng thành công!");
        });
        builder.addCase(actAddOrder.rejected, (state, action) => {
            state.orders = [];
            message.error(action.payload);
        });

        builder.addCase(actFetchOrderById.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(actFetchOrderById.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = {};
        });
        builder.addCase(actFetchOrderById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        });
        builder.addCase(actDeleteOderById.fulfilled, (state, action) => {
            state.isLoading = false;
            message.success("Đơn hàng đã được xóa thành công!");
        });
    },
});

export const { setNewPage, setLoading, sendOrderSuccess, sendOrderFailure, clearOrder } =
    orderSlice.actions;
export const orderReducer = orderSlice.reducer;