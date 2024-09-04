import React from 'react'
import WetShop from '../../components/WetShop'
import useScrollToTop from '../../hooks/useScrollToTop'

const WetPage = () => {
    useScrollToTop()
    return (
        <div>
            <WetShop></WetShop>
        </div>
    )
}

export default WetPage