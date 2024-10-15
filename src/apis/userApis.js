import axios from "axios"

export const userApis = {
    createNewUser: async (user) => {
        return await axios.post(`${process.env.REACT_APP_BE_URL}users`, user)
    },
    getAllUsers: async (params) => {
        const response = await axios.get(`${process.env.REACT_APP_BE_URL}users`, {
            params: params,
        });
        return response.data
    },
    getUserById: async (userId) => {
        const response = await axios.get(
            `${process.env.REACT_APP_BE_URL}users/${userId}`
        );
        return response.data;
    },
    updateUserById: async (userId, userUpdate) => {
        return await axios.patch(
            `${process.env.REACT_APP_BE_URL}users/${userId}`,
            userUpdate
        );
    },
    resetPassword: async (userId) => {
        const newPassword = {
            password: "123456",
            confirmPassword: "123456"
        }
        const response = await axios.patch(`${process.env.REACT_APP_BE_URL}users/${userId}`,
            newPassword
        )
        return response.data
    }

}