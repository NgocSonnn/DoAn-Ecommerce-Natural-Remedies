import axios from "axios";

export const orderApis = {
    getAllOrders: async (params) => {
        const response = await axios.get(`${process.env.REACT_APP_BE_URL}orders`, {
            params: { ...params }
        });
        return response;
    },

    getOrderById: async (id) => {
        const { data } = await axios.get(
            `${process.env.REACT_APP_BE_URL}orders/${id}`
        );
        return data;
    },

    addOrder: async (order) => {
        const response = await axios.post(
            `${process.env.REACT_APP_BE_URL}orders`,
            order
        );
        return response.data;
    },

    deleteOrder: async (id) => {
        return await axios.delete(`${process.env.REACT_APP_BE_URL}orders/${id}`);
    },

    updateOrder: async (id, order) => {
        const response = await axios.patch(
            `${process.env.REACT_APP_BE_URL}orders/${id}`,
            order
        );
        return response;
    },
};