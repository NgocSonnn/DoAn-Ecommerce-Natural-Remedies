import React from 'react'
import CartComponent from '../../components/cart'
import useScrollToTop from '../../hooks/useScrollToTop'

const CartPage = () => {
    useScrollToTop()
    return (
        <div>
            <CartComponent></CartComponent>
        </div>
    )
}

export default CartPage