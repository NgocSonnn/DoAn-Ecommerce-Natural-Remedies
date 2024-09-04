import React from 'react'
import TermOfUseComponent from '../../components/TermOfUseComponent'
import useScrollToTop from '../../hooks/useScrollToTop'

const TermOfUsePage = () => {
    useScrollToTop()
    return (
        <div>
            <TermOfUseComponent></TermOfUseComponent>
        </div>
    )
}

export default TermOfUsePage