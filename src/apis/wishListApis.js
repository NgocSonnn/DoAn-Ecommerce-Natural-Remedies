import axios from "axios";

export const wishListApis = {
    getAllWishList: async (params) => {
        const response = await axios.get(
            `${process.env.REACT_APP_BE_URL}wishLists`, {
            params
        }
        );
        return response;
    },

    addWishLists: async ({ wishList, userId }) => {
        const response = await axios.post(
            `${process.env.REACT_APP_BE_URL}wishLists`,
            { wishList, userId }
        );

        return response.data;
    },

    getWishListsById: async (id) => {
        const response = await axios.get(
            `${process.env.REACT_APP_BE_URL}wishLists/${id}`
        );
        return response;
    },

    deleteWishListsById: async (id) => {
        return await axios.delete(`${process.env.REACT_APP_BE_URL}wishLists/${id}`);
    },
};