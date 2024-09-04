import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userApis } from "../../../apis/userApis"
import { message } from "antd"

const initialState = {
    isLoading: false,
    users: [],
    errors: {},
    isLogin: JSON.parse(localStorage.getItem("isLogin")) || false,
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},

}
export const actCreateNewUser = createAsyncThunk("users,actCreateNewUser", async (formValue, thunkAPI) => {
    try {
        const users = await userApis.getAllUsers()
        const { email, phoneNumber } = formValue;
        const foundEmail = users.find((u) => u.email === email);
        const foundPhoneNumber = users.find((u) => u.phoneNumber === phoneNumber);

        if (foundEmail) {
            return thunkAPI.rejectWithValue("Email này đã tồn tại");
        } else if (foundPhoneNumber) {
            return thunkAPI.rejectWithValue("Số điện thoại này đã tồn tại!");
        } else {
            await userApis.createNewUser(formValue);
        }
    } catch (error) {
        console.log(error, "error actCreateNewUser");
    }
})
export const actLogin = createAsyncThunk(
    "users/actLogin",
    async (formValue, thunkAPI) => {
        const users = await userApis.getAllUsers();
        const { phoneNumber, password } = formValue;
        const foundUser = users.find(
            (u) => u.phoneNumber === phoneNumber && u.password === password
        );
        // delete foundUser.confirmPassword;

        if (foundUser) {
            thunkAPI.dispatch(loginSuccess(foundUser));
        } else {
            return thunkAPI.rejectWithValue("User or Password incorrect!");
        }
    }
);
export const actFetchAllUsers = createAsyncThunk(
    "users/actFetchAllUsers",
    async (params) => {
        return await userApis.getAllUsers({
            params: params
        });
    }
);
export const actFetchUserById = createAsyncThunk(
    "users/actFetchUserById",
    async (userId) => {
        const user = await userApis.getUserById(userId);
        return user;
    }
);
export const actUpdatePhoneNumberById = createAsyncThunk(
    "users/actUpdatePhoneNumberById",
    async ({ id, userUpdate }, thunkAPI) => {
        await userApis.updateUserById(id, userUpdate);
        thunkAPI.dispatch(setUserInfo(userUpdate));
        thunkAPI.dispatch(actFetchAllUsers());
        return null;
    }
);
export const actUpdatePasswordById = createAsyncThunk(
    "users/actUpdatePasswordById",
    async ({ id, userUpdate }, thunkAPI) => {
        await userApis.updateUserById(id, userUpdate);
        thunkAPI.dispatch(actFetchAllUsers());
        return userUpdate;
    }
);



const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isLogin = true;
            state.userInfo = action.payload;
            message.success("Đăng nhập thành công!");
            localStorage.setItem("isLogin", true);
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.isLogin = false;
            localStorage.setItem("isLogin", false);
            localStorage.setItem("userInfo", JSON.stringify(null));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actCreateNewUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(actCreateNewUser.rejected, (state, action) => {
            state.errors = {};
            // lấy cái thunkAPI.rejectWithValue ra hiển thị
            message.error(action.payload);
            state.isLoading = false;
        });
        builder.addCase(actCreateNewUser.fulfilled, (state, action) => {
            state.users = action.payload;
            message.success("Tạo tài khoản thành công!");
            state.isLoading = false;
        });
        builder.addCase(actLogin.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(actLogin.rejected, (state, action) => {
            state.errors = {};
            message.error("Số điện thoại hoặc mật khẩu sai!");
            state.isLoading = false;
        });
        builder.addCase(actFetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });

        builder.addCase(actFetchUserById.fulfilled, (state, action) => {
            state.userInfo = action.payload;
        });

        builder.addCase(actUpdatePhoneNumberById.fulfilled, (state, action) => {
            message.success("Cập nhật tài khoản thành công!");
            state.userInfo = action.payload;
        });

        builder.addCase(actUpdatePasswordById.fulfilled, (state, action) => {
            // console.log(action.payload, "payload ne");
            state.userInfo.password = action.payload.password;
            state.userInfo.confirmPassword = action.payload.confirmPassword;
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
            message.success("Cập nhật tài khoản thành công!");
        });
    }
})
export const { setLoading, loginSuccess, setUserInfo, logout } = userSlice.actions
export const userReducer = userSlice.reducer