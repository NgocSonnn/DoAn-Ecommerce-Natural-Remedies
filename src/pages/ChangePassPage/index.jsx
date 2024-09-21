import React from 'react'
import useScrollToTop from '../../hooks/useScrollToTop'
import ChangePassComponent from '../../components/ChangePassComponent'

const ChangePassPage = () => {
    useScrollToTop()
    return (
        <div>
            <ChangePassComponent></ChangePassComponent>
        </div>
    )
}

export default ChangePassPage