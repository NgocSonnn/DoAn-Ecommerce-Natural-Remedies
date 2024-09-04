import React from 'react'
import ShopDetail from '../../components/ShopDetail'
import useScrollToTop from '../../hooks/useScrollToTop'

const ShopDetailPage = () => {
    useScrollToTop()
    return (
        <div>
            <ShopDetail></ShopDetail>
        </div>
    )
}

export default ShopDetailPage