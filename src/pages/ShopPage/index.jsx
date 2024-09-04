import React from 'react'
import ShopComponent from '../../components/ShopComponent'
import useScrollToTop from '../../hooks/useScrollToTop'

const ShopPage = () => {
    useScrollToTop()
    return (
        <div>
            <ShopComponent></ShopComponent>
        </div>
    )
}

export default ShopPage