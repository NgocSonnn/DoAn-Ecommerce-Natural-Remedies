import axios from "axios"

export const couponsApis = {
    getAllCoupons: async () => {
        const response = await axios.get(`${process.env.REACT_APP_BE_URL}coupons`)
        return response
    },
    updateCoupons: async (id, quantity) => {
        const productResponse = await axios.get(`${process.env.REACT_APP_BE_URL}coupons/${id}`)
        const currentPurchase = productResponse.data.quantity;
        const updatedPurchase = currentPurchase - 1;
        const response = await axios.patch(`${process.env.REACT_APP_BE_URL}coupons/${id}`, {
            quantity: updatedPurchase
        })
        return response.data
    }

}