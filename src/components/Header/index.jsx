import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/user/userSlice';
import { message } from 'antd';
import { actFetchAllWishLists } from '../../redux/features/wishList/wishListSlice';
import { actClearCart } from '../../redux/features/cart/cartSlice';

const HeaderComponent = () => {
    const cartItems = useSelector(state => state.carts.carts)
    const wishListAll = useSelector(state => state.wishLists.wishListAll)
    const isLogin = useSelector(state => state.user.isLogin);
    const userInfo = useSelector(state => state.user.userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const cartItemCount = cartItems.length

    const handleLogout = () => {
        dispatch(logout());
        message.success("Đăng xuất thành công!")
        navigate(ROUTES.HOME_PAGE)
        dispatch(actClearCart())
        window.location.reload();
    };
    useEffect(() => {
        dispatch(actFetchAllWishLists({
            userId: userInfo.id
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
    const filterWishLists = wishListAll.filter(wishList => {
        return wishList.userId === userInfo.id
    });
    const wishListsCount = filterWishLists.length

    return (
        <div className="container-fluid fixed-top">
            <div className="container topbar bg-primary d-none d-lg-block">
                <div className="d-flex justify-content-between">
                    <div className="top-info ps-2">
                        <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="https://maps.app.goo.gl/qfvGL9aS6dewuXTcA" target='_blank' rel='noopener noreferrer' className="text-white">3 Nguyễn Thức Tự, A Lưới, TTH</a></small>
                        <small className="me-3"><i className="fas fa-mobile-alt me-2 text-secondary"></i><a href="https://www.facebook.com/profile.php?id=100041596806403" target='_blank' rel='noopener noreferrer' className="text-white">0363041668</a></small>
                    </div>
                    <div className="top-link pe-2">
                        <Link to={ROUTES.PRIVACYPOLICY_PAGE} className="text-white"><small className="text-white mx-2">CS bảo mật</small>/
                        </Link>
                        <Link to={ROUTES.TERMOFUSE_PAGE} className="text-white"><small className="text-white mx-2">Điều khoản SD</small>/
                        </Link>
                        <Link to={ROUTES.SALENREFUND_PAGE} className="text-white"><small className="text-white mx-2">CS bán hàng</small>
                        </Link>
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
                            <NavLink to={ROUTES.HOME_PAGE} className="nav-item nav-link" activeclassname="text-primary">Trang chủ</NavLink>
                            <NavLink to={ROUTES.SHOP_PAGE} className="nav-item nav-link" activeclassname="text-primary">Sản phẩm</NavLink>
                            <NavLink to={ROUTES.TESTIMONIAL_PAGE} className="nav-item nav-link" activeclassname="text-primary">Nhận xét của khách hàng</NavLink>
                            <NavLink to={ROUTES.CONTACT_PAGE} className="nav-item nav-link" activeclassname="text-primary">Liên hệ</NavLink>
                        </div>
                        <div className="d-flex m-3 me-0">
                            <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary"></i></button>
                            <NavLink to={ROUTES.CART_PAGE} className="position-relative me-4 my-auto" activeclassname="text-primary">
                                <i className="fa fa-shopping-bag fa-2x"></i>
                                <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: "-5px", left: "15px", height: "20px", minWidth: "20px" }}>{cartItemCount}</span>
                            </NavLink>
                            <NavLink to={ROUTES.WISHLIST_PAGE} className="position-relative me-4 my-auto" activeclassname="text-primary">
                                <i className="fa fa-heart fa-2x"></i>
                                <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: "-5px", left: "15px", height: "20px", minWidth: "20px" }}>{wishListsCount}</span>
                            </NavLink>
                            <div className='user-container'>
                                <div className="position-relative my-auto">
                                    <button className="btn btn-link dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-user fa-2x"></i>
                                    </button>
                                    {isLogin && (
                                        <div className="user-greeting position-absolute">
                                            <span>Xin chào, {userInfo?.fullName}</span>
                                        </div>
                                    )}
                                    <ul className="dropdown-menu" aria-labelledby="userDropdown">
                                        {isLogin ? (
                                            <div className='user-dropdown'>
                                                <li>
                                                    <Link to={ROUTES.ACCOUNT_PAGE} className="dropdown-item">Thông tin cá nhân</Link>
                                                </li>
                                                <li>
                                                    <Link to={ROUTES.HISTORYPURCHASE_ACCOUNT_PAGE} className="dropdown-item">Lịch sử mua hàng</Link>
                                                </li>
                                                <li>
                                                    <button className="dropdown-item" onClick={handleLogout}>Đăng xuất</button>
                                                </li>
                                            </div>
                                        ) : (
                                            <div className='user-dropdown'>
                                                <li>
                                                    <Link className="dropdown-item" to={ROUTES.LOGIN_PAGE}>Đăng nhập</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to={ROUTES.REGISTER_PAGE}>Đăng ký</Link>
                                                </li>
                                            </div>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default HeaderComponent;
