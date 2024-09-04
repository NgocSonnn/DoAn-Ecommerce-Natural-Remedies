import React from 'react'
import TestimonialHomePage from '../../components/TestimonialHomePage'
import useScrollToTop from '../../hooks/useScrollToTop'

const TestimonialPage = () => {
    useScrollToTop()
    return (
        <div>
            <TestimonialHomePage></TestimonialHomePage>
        </div>
    )
}

export default TestimonialPage