import React from 'react'
import Component404 from '../../components/Component404'
import useScrollToTop from '../../hooks/useScrollToTop'

const Page404 = () => {
    useScrollToTop()
    return (
        <div>
            <Component404 title="404 Error"></Component404>
        </div>
    )
}

export default Page404