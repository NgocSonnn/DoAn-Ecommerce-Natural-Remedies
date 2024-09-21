import React from 'react'
import useScrollToTop from '../../hooks/useScrollToTop'
import HistoryPurcaseComponent from '../../components/HistoryPurchaseComponen'

const HistoryPurchasePage = () => {
    useScrollToTop()
    return (
        <div>
            <HistoryPurcaseComponent></HistoryPurcaseComponent>
        </div>
    )
}

export default HistoryPurchasePage