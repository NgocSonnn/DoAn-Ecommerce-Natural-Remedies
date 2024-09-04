import React from 'react'
import SalenRefunComponent from '../../components/SalenRefundComponent'
import useScrollToTop from '../../hooks/useScrollToTop'

const SalenRefundPage = () => {
    useScrollToTop()
    return (
        <div>
            <SalenRefunComponent></SalenRefunComponent>
        </div>
    )
}

export default SalenRefundPage