import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { wishListApis } from "../../../apis/wishListApis";

const initialState = {
    wishLists: [],
    wishListAll: [],
    isLoading: false,
    errors: {},
    pagination: {
        currentPage: 1,
        limitPerPage: 9,
        total: 8,

    },
    searchKey: "",
};
export const actFetchAllWishListsByUserId = createAsyncThunk("wishList/actFetchAllWishListsByUserId", async (params = {}) => {
    const response = await wishListApis.getAllWishList({ ...params, })
    return {
        data: response.data,
        total: response.headers.get('X-Total-Count')
    }
})
export const actAddWishList = createAsyncThunk("wishList/actAddWishList", async ({ wishList, userId }) => {
    const response = await wishListApis.addWishLists({ wishList, userId });
    return response;
});
export const actFetchWishListById = createAsyncThunk("wishList/actFetchWishListById", async (id) => {
    const response = await wishListApis.getWishListsById(id);
    return response.data
})
export const actDeleteWishListById = createAsyncThunk("wishList/actDeleteWishListById", async (id) => {
    await wishListApis.deleteWishListsById(id)
    return null
})

export const actFetchAllWishLists = createAsyncThunk("wishList/actFetchAllWishLists", async (params = {}) => {
    const response = await wishListApis.getAllWishList({ ...params, })
    return response.data
})

const wishListSlice = createSlice({
    name: "wishLists",
    initialState: initialState,
    reducers: {
        setNewPage: (state, action) => {
            state.pagination.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actFetchAllWishListsByUserId.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(actFetchAllWishListsByUserId.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = {};
        });
        builder.addCase(actFetchAllWishListsByUserId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.wishLists = action.payload.data;
            state.pagination.total = action.payload.total
        });
        builder.addCase(actAddWishList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(actAddWishList.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = {};

        });
        builder.addCase(actAddWishList.fulfilled, (state, action) => {
            state.isLoading = false;
            const product = action.payload;
            const existedItemIndex = state.wishLists.find(
                (item) =>
                    item.userId === product.userId
                    && item.wishList.productId === product.wishList.productId
            );
            if (existedItemIndex) {
            } else {
                state.wishLists.push(product);
            }
        });
        builder.addCase(actFetchWishListById.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(actFetchWishListById.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = {};
        });
        builder.addCase(actFetchWishListById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.wishLists = action.payload;
        });
        builder.addCase(actDeleteWishListById.fulfilled, (state, action) => {
            state.isLoading = false;
            message.success("Sản phẩm đã được xóa khỏi danh sách yêu thích!!");
        });
        builder.addCase(actFetchAllWishLists.fulfilled, (state, action) => {
            state.isLoading = false;
            state.wishListAll = action.payload;
        });

    },
});
export const { setNewPage } = wishListSlice.actions
export const wishListReducer = wishListSlice.reducer;