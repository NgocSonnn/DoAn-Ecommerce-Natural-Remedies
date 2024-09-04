import React from 'react'
import RegisterComponent from '../../components/RegisterComponent'
import useScrollToTop from '../../hooks/useScrollToTop'

const RegisterPage = () => {
    useScrollToTop()
    return (
        <div>
            <RegisterComponent></RegisterComponent>
        </div>
    )
}

export default RegisterPage