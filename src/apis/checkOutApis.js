import axios from "axios"

export const checkOutApis = {
    getAllCheckOutBill: async () => {
        const response = await axios.get(`${process.env.REACT_APP_BE_URL}checkOutBills`)
        return response.data
    },
    addBill: async (order) => {
        const response = await axios.post(`${process.env.REACT_APP_BE_URL}checkOutBills`, order)
        return response.data
    }
}