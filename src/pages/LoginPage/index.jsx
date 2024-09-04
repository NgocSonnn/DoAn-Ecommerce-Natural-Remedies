import React from 'react'
import LoginComponent from '../../components/LoginComponent'
import useScrollToTop from '../../hooks/useScrollToTop'

const LoginPage = () => {
    useScrollToTop()
    return (
        <div>
            <LoginComponent></LoginComponent>
        </div>
    )
}

export default LoginPage