import React from 'react'

const FeatureSection = () => {
    return (
        <div className="container-fluid featurs py-5">
            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-md-6 col-lg-3">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <i className="fas fa-car-side fa-3x text-white"></i>
                            </div>
                            <div className="featurs-content text-center">
                                <h5>Giao hàng miễn phí</h5>
                                <p className="mb-0">Áp dụng cho tất cả các đơn hàng</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <i className="fas fa-user-shield fa-3x text-white"></i>
                            </div>
                            <div className="featurs-content text-center">
                                <h5>Thanh toán an toàn</h5>
                                <p className="mb-0">Cam kết bảo mật thông tin thanh toán</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <i className="fas fa-exchange-alt fa-3x text-white"></i>
                            </div>
                            <div className="featurs-content text-center">
                                <h5>Đổi trả trong 15 ngày</h5>
                                <p className="mb-0">Hoàn tiền trong vòng 15 ngày nếu không hài lòng.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <i className="fa fa-phone-alt fa-3x text-white"></i>
                            </div>
                            <div className="featurs-content text-center">
                                <h5>Hỗ trợ 24/7</h5>
                                <p className="mb-0">Phản hồi và hỗ trợ khách hàng nhanh chóng.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureSection