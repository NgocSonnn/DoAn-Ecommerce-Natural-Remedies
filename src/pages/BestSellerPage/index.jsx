import React from 'react'
import BestSellerProduct from '../../components/BestSellerProduct'
import useScrollToTop from '../../hooks/useScrollToTop'

const BestSellerPage = () => {
    useScrollToTop()
    return (
        <div>
            <BestSellerProduct></BestSellerProduct>
        </div>
    )
}

export default BestSellerPage