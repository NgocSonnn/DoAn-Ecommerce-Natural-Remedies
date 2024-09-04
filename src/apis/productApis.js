import axios from "axios"

export const productApis = {
    getAllProduct: async (params) => {
        const response = await axios.get(`${process.env.REACT_APP_BE_URL}products`, {
            params: { ...params }
        })
        return response;
    },
    getProductsById: async (productId) => {
        const response = await axios.get(`${process.env.REACT_APP_BE_URL}products/${productId}`
        );
        return response.data
    },
}
