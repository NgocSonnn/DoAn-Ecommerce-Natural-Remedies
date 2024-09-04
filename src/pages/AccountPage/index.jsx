import React from 'react'
import AccountComponent from '../../components/AccountComponent'
import useScrollToTop from '../../hooks/useScrollToTop'


const AccountPage = () => {
    useScrollToTop()
    return (
        <div>
            <AccountComponent></AccountComponent>
        </div>
    )
}

export default AccountPage