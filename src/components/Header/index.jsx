import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import './style.scss'
import { useSelector } from 'react-redux';

const HeaderComponent = () => {
    const cartItems = useSelector(state => state.carts.carts)
    const cartItemCount = cartItems.length



    return (
        <div className="container-fluid fixed-top">
            <div className="container topbar bg-primary d-none d-lg-block">
                <div className="d-flex justify-content-between">
                    <div className="top-info ps-2">
                        <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="https://maps.app.goo.gl/qfvGL9aS6dewuXTcA" target='_blank' rel='noopener noreferrer' className="text-white">3 Nguyễn Thức Tự, A Lưới, TTH</a></small>
                        <small className="me-3"><i className="fas fa-mobile-alt me-2 text-secondary"></i><a href="https://www.facebook.com/profile.php?id=100041596806403" target='_blank' rel='noopener noreferrer' className="text-white">0363041668</a></small>
                    </div>
                    <div className="top-link pe-2">
                        <Link to={ROUTES.PRIVACYPOLICY_PAGE} className="text-white"><small className="text-white mx-2">CS bảo mật</small>/</Link>
                        <Link to={ROUTES.TERMOFUSE_PAGE} className="text-white"><small className="text-white mx-2">Điều khoản SD</small>/</Link>
                        <Link to={ROUTES.SALENREFUND_PAGE} className="text-white"><small className="text-white ms-2">CS bán hàng</small></Link>
                    </div>
                </div>
            </div>
            <div style={{ padding: 0 }} className="container px-0">
                <nav className="navbar navbar-light bg-white navbar-expand-xl">
                    <Link to={ROUTES.HOME_PAGE} className="navbar-brand"><h1 className="text-primary display-6">Natural Remedies</h1></Link>
                    <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars text-primary"></span>
                    </button>
                    <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                        <div className="navbar-nav mx-auto">
                            <Link to={ROUTES.HOME_PAGE} className="nav-item nav-link" >Trang chủ</Link>
                            <Link to={ROUTES.SHOP_PAGE} className="nav-item nav-link">Sản phẩm</Link>
                            <Link to={ROUTES.SHOP_DETAIL_PAGE} className="nav-item nav-link">Thông tin về sản phẩm</Link>
                            <div className="nav-item dropdown">
                                <a href="/#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Trang</a>
                                <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                    <Link to={ROUTES.CART_PAGE} className="dropdown-item">Giỏ hàng</Link>
                                    <Link to={ROUTES.CHECKOUT_PAGE} className="dropdown-item">Thanh toán</Link>
                                    <Link to={ROUTES.TESTIMONIAL_PAGE} className="dropdown-item">Nhận xét của khách hàng</Link>
                                    <Link to={ROUTES.PAGE_404} className="dropdown-item">404 Page</Link>
                                </div>
                            </div>
                            <Link to={ROUTES.CONTACT_PAGE} className="nav-item nav-link">Liên hệ</Link>
                        </div>
                        <div className="d-flex m-3 me-0">
                            <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary"></i></button>
                            <Link to={ROUTES.CART_PAGE} className="position-relative me-4 my-auto">
                                <i className="fa fa-shopping-bag fa-2x"></i>
                                <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: "-5px", left: "15px", height: "20px", minWidth: "20px" }}>{cartItemCount}</span>
                            </Link>
                            <Link to={ROUTES.LOGIN_PAGE} className="my-auto">
                                <i className="fas fa-user fa-2x"></i>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default HeaderComponent;
