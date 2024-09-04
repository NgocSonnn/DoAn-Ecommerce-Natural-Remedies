import React from 'react'
import FAQComponent from '../../components/FAQComponent'
import useScrollToTop from '../../hooks/useScrollToTop'

const FAQPage = () => {
    useScrollToTop()
    return (
        <div>
            <FAQComponent></FAQComponent>
        </div>
    )
}

export default FAQPage