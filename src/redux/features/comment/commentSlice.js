import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentApis } from "../../../apis/commentApis";
import { message } from "antd";

const initialState = {
    isLoading: false,
    errors: {},
    comments: [],
    comment: {},
    pagination: {
        currentPage: 1,
        limitPerPage: 5,
        total: 5,
    },
    sortField: "createdAt",
    sortOrder: "desc",

};

export const actFetchAllComments = createAsyncThunk(
    "comment/actFetchAllComments",
    async (params = {}) => {
        const response = await commentApis.getAllComments(params);
        return {
            data: response.data,
            total: response.headers.get("X-Total-Count"),
        };
    }
);

export const actAddComment = createAsyncThunk(
    "comment/actAddComment",
    async (comment) => {
        const response = await commentApis.addComment(comment);
        return response;
    }
);

export const actEditCommentById = createAsyncThunk(
    "comment/actEditCommentById",
    async ({ id, commentUpdate }) => {
        const response = await commentApis.editCommentById(id, commentUpdate);
        return response;
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState: initialState,
    reducers: {
        setNewPage: (state, action) => {
            state.pagination = {
                ...state.pagination,
                currentPage: action.payload,
            };
        },
        setSortField: (state, action) => {
            state.sortField = action.payload
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actFetchAllComments.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(actFetchAllComments.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = {};
        });
        builder.addCase(actFetchAllComments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comments = action.payload.data;
            state.pagination.total = action.payload.total;

        });
        builder.addCase(actAddComment.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(actAddComment.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = {};
            message.error("Nhận xét lỗi!");
        });
        builder.addCase(actAddComment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comment = action.payload;
            state.comments = [action.payload, ...state.comments];
            message.success("Nhận xét thành công!");
        });

        builder.addCase(actEditCommentById.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(actEditCommentById.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = {};
            message.error("Cập nhật nhật xét thất bại!");
        });
        builder.addCase(actEditCommentById.fulfilled, (state, action) => {
            message.success("Cập nhật nhận xét thành công!");
        });
    },
});

export const { setNewPage, setSortField, setSortOrder } = commentSlice.actions;
export const commentReducer = commentSlice.reducer;