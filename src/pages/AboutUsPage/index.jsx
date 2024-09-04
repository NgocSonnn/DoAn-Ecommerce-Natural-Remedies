import React from 'react'
import AboutUsComponent from '../../components/AboutUsComponent'
import useScrollToTop from '../../hooks/useScrollToTop'

const AboutUsPage = () => {
    useScrollToTop()
    return (
        <div>
            <AboutUsComponent></AboutUsComponent>
        </div>
    )
}

export default AboutUsPage