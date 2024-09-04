import React from 'react'
import ContactComponent from '../../components/Contact'
import useScrollToTop from '../../hooks/useScrollToTop'

const ContactPage = () => {
    useScrollToTop()
    return (
        <div>
            <ContactComponent></ContactComponent>
        </div>
    )
}

export default ContactPage