import React from 'react'
import DryShop from '../../components/DryShop'
import useScrollToTop from '../../hooks/useScrollToTop'

const DryPage = () => {
    useScrollToTop()
    return (
        <div>
            <DryShop></DryShop>
        </div>
    )
}

export default DryPage