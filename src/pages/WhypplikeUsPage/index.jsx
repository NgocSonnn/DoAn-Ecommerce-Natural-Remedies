import React from 'react'
import WhypplikeUsComponent from '../../components/WhypplikeUsComponent'
import useScrollToTop from '../../hooks/useScrollToTop'

const WhypplikeUsPage = () => {
    useScrollToTop()
    return (
        <div>
            <WhypplikeUsComponent></WhypplikeUsComponent>
        </div>
    )
}

export default WhypplikeUsPage