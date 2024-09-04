import React from 'react'
import PrivacyPolicyComponent from '../../components/PrivacyPolicyComponent'
import useScrollToTop from '../../hooks/useScrollToTop'

const PrivacyPolicyPage = () => {
    useScrollToTop()
    return (
        <div>
            <PrivacyPolicyComponent></PrivacyPolicyComponent>
        </div>
    )
}

export default PrivacyPolicyPage