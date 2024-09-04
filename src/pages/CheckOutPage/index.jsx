import React from 'react'
import CheckOutComponent from '../../components/CheckOut'
import useScrollToTop from '../../hooks/useScrollToTop'

const CheckOutPage = () => {
    useScrollToTop()
    return (
        <div>
            <CheckOutComponent></CheckOutComponent>
        </div>
    )
}

export default CheckOutPage