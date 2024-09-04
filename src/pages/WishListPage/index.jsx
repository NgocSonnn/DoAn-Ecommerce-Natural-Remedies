import React from 'react'
import WishListComponent from '../../components/WishListComponent'
import useScrollToTop from '../../hooks/useScrollToTop'

const WishListPage = () => {
    useScrollToTop()
    return (
        <div>
            <WishListComponent></WishListComponent>
        </div>
    )
}

export default WishListPage