import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { message } from 'antd'

const FooterComponent = () => {
    const [phoneNumberCall, setPhoneNumberCall] = useState('');
    function isVietnamesePhoneNumber(number) {
        return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
    }
    const handlePhoneCall = (event) => {
        event.preventDefault();
        if (phoneNumberCall.length === 0 && !isVietnamesePhoneNumber(phoneNumberCall)) {
            message.warning("Bạn chưa nhập số điện thoại!")
        } else if (!isVietnamesePhoneNumber(phoneNumberCall)) {
            message.warning("Số điện thoại bạn nhập sai!")
        }
        else {
            message.success("Hệ thống đã tiếp nhận số điện thoại của bạn và sẽ liên lạc với bạn trong thời gian sắp tới, Xin cảm ơn!")
            setPhoneNumberCall('')
        }
    }


    return (
        <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
            <div className="container py-5">
                <div className="pb-4 mb-4" style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}>
                    <div className="row g-4">
                        <div className="col-lg-3">
                            <Link to={ROUTES.HOME_PAGE}>
                                <h1 className="text-primary mb-0">Natural Remedies
                                </h1>
                                <p className="text-secondary mb-0">sản phẩm từ thiên</p>
                            </Link>
                        </div>
                        <form onSubmit={handlePhoneCall} className="col-lg-6">
                            <div className="position-relative mx-auto">
                                <input value={phoneNumberCall} onChange={(e) => { setPhoneNumberCall(e.target.value) }} className="form-control border-0 w-100 py-3 px-4 rounded-pill" type="number" placeholder="Số điện thoại của bạn" />
                                <button type="submit" className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white" style={{ top: 0, right: 0 }}>Bấm vào đây để được tư vấn miễn phí</button>
                            </div>
                        </form>
                        <div className="col-lg-3">
                            <div className="d-flex justify-content-end pt-3">
                                <a className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle" href="https://www.facebook.com/profile.php?id=100041596806403" target='_blank' rel="noopener noreferrer"><i className="fas fa-sms"></i></a>
                                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="https://www.facebook.com/profile.php?id=100041596806403" target='_blank' rel="noopener noreferrer"><i className="fas fa-mobile-alt"></i></a>
                                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="https://www.facebook.com/profile.php?id=100041596806403" target='_blank' rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-5">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-light mb-3">Tại sao khách hàng yêu thích chúng tôi!</h4>
                            <p className="mb-4">Chúng tôi cam kết cung cấp các sản phẩm dược liệu thiên nhiên chất lượng cao nhất.</p>
                            <Link to={ROUTES.WHYPPLIKEUS_PAGE} className="btn border-secondary py-2 px-4 rounded-pill text-primary">Đọc thêm</Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="d-flex flex-column text-start footer-item">
                            <h4 className="text-light mb-3">Thông tin</h4>
                            <Link className="btn-link" to={ROUTES.ABOUTUS_PAGE}>Giới thiệu về chúng tôi</Link>
                            <Link className="btn-link" to={ROUTES.CONTACT_PAGE}>Liên hệ với chúng tôi</Link>
                            <Link className="btn-link" to={ROUTES.PRIVACYPOLICY_PAGE}>Chính sách bảo mật</Link>
                            <Link className="btn-link" to={ROUTES.TERMOFUSE_PAGE}>Điều khoản & Điều kiện</Link>
                            <Link className="btn-link" to={ROUTES.SALENREFUND_PAGE}>Chính sách đổi trả</Link>
                            <Link className="btn-link" to={ROUTES.FAQ_PAGE}>Câu hỏi thường gặp & Hỗ trợ</Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="d-flex flex-column text-start footer-item">
                            <h4 className="text-light mb-3">Tài khoản</h4>
                            <Link className="btn-link" to={ROUTES.ACCOUNT_PAGE}>Tài khoản của tôi</Link>
                            <Link className="btn-link" to={ROUTES.CONTACT_PAGE}>Thông tin cửa hàng</Link>
                            <Link className="btn-link" to={ROUTES.CART_PAGE}>Giỏ hàng</Link>
                            <Link className="btn-link" to={ROUTES.WISHLIST_PAGE}>Danh sách yêu thích</Link>
                            <Link className="btn-link" to={ROUTES.HISTORYPURCHASE_ACCOUNT_PAGE}>Lịch sử đơn hàng</Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-light mb-3">Liên hệ</h4>
                            <p>Địa chỉ: 3 Nguyễn Thức Tự, huyện A Lưới, tỉnh Thừa Thiên Huế</p>
                            <p>Facebook: https://www.facebook.com/profile.php?id=100015270968166</p>
                            <p>SDT: 0363041668</p>
                            <p>Có thể thanh toán trực tiếp hoặc chuyển khoản</p>
                            <img src="img/payment.png" className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FooterComponent