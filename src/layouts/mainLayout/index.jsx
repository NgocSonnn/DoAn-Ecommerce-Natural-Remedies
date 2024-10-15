import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import HeaderComponent from '../../components/Header'
import FooterComponent from '../../components/Footer'
import ModalSearch from '../../components/ModalSearch'
import BacktoTop from '../../components/BacktoTop'
import SinglePageHeader from '../../components/SinglePageHeader'
import SpinnerComponent from '../../components/SpinnerComponent'
import { useEffect } from "react";
import { ROUTES } from '../../constants/routes'
import './style.scss'

const MainLayout = () => {
    const [pageTitle, setPageTitle] = useState("");
    const location = useLocation();
    useEffect(() => {
        let title = ''
        switch (location.pathname) {
            case '/':
                title = 'Trang chủ';
                break;
            case ROUTES.HOME_PAGE:
                title = 'Trang chủ';
                break;
            case ROUTES.CART_PAGE:
                title = 'Giỏ hàng';
                break;
            case ROUTES.CHECKOUT_PAGE:
                title = 'Thanh toán';
                break;
            case ROUTES.CONTACT_PAGE:
                title = 'Liên hệ';
                break;
            case ROUTES.SHOP_DETAIL_PAGE:
                title = 'Thông tin sản phẩm';
                break;
            case ROUTES.SHOP_PAGE:
                title = 'Sản phẩm';
                break;
            case ROUTES.TESTIMONIAL_PAGE:
                title = 'Nhận xét của khách hàng';
                break;
            case ROUTES.PAGE_404:
                title = '404 Not Found';
                break;
            case ROUTES.WET_PAGE:
                title = 'Sản phẩm tươi';
                break;
            case ROUTES.DRY_PAGE:
                title = 'Sản phẩm khô';
                break;
            case ROUTES.BESTSELLER_PAGE:
                title = 'Sản phẩm bán chạy';
                break;
            case ROUTES.PRIVACYPOLICY_PAGE:
                title = 'Chính sách bảo mật';
                break;
            case ROUTES.TERMOFUSE_PAGE:
                title = 'Điều khoản sử dụng';
                break;
            case ROUTES.SALENREFUND_PAGE:
                title = 'Chính sách bán và hoàn tiền';
                break;
            case ROUTES.LOGIN_PAGE:
                title = 'Đăng nhập';
                break;
            case ROUTES.REGISTER_PAGE:
                title = 'Đăng ký';
                break;
            case ROUTES.WHYPPLIKEUS_PAGE:
                title = 'Tại sao khách hàng yêu thích chúng tôi';
                break;
            case ROUTES.ABOUTUS_PAGE:
                title = 'Giới thiệu về chúng tôi';
                break;
            case ROUTES.FAQ_PAGE:
                title = 'Câu hỏi thường gặp';
                break;
            case ROUTES.HISTORYPURCHASE_ACCOUNT_PAGE:
                title = 'Lịch sử mua hàng';
                break;
            case ROUTES.ACCOUNT_PAGE:
                title = 'Thông tin khách hàng';
                break;
            case ROUTES.CHANGEPASS_ACCOUNT_PAGE:
                title = 'Thay đổi thông tin và mật khẩu';
                break;
            case ROUTES.WISHLIST_PAGE:
                title = 'Danh sách yêu thích';
                break;
            default:
                title = 'Thông tin sản phẩm';
                break;
        }
        document.title = title;
        setPageTitle(title);

    }, [location.pathname]);

    return (
        <div className="main-layout-container">
            <SpinnerComponent></SpinnerComponent>
            <HeaderComponent></HeaderComponent>
            <ModalSearch></ModalSearch>
            <SinglePageHeader title={pageTitle}></SinglePageHeader>
            <Outlet />
            <FooterComponent></FooterComponent>
            <BacktoTop></BacktoTop>
        </div>
    )
}

export default MainLayout