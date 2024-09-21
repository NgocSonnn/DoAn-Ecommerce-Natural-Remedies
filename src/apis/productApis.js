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
    updateProductPurchase: async (productId, quantity) => {
        const productResponse = await axios.get(`${process.env.REACT_APP_BE_URL}products/${productId}`);
        const currentPurchase = productResponse.data.purchase;
        const updatedPurchase = currentPurchase + quantity;
        const response = await axios.patch(`${process.env.REACT_APP_BE_URL}products/${productId}`, {
            purchase: updatedPurchase
        });
        return response.data;
    },
}
