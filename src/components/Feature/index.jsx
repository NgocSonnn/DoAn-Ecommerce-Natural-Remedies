import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const Feature = () => {
    return (
        <div className="container-fluid service py-5">
            <div className="container py-5">
                <div className="row g-4 justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <Link to={ROUTES.SHOP_PAGE}>
                            <div className="service-item bg-secondary rounded border border-secondary">
                                <img src="/img/mat-ong-4.jpg" className="img-fluid rounded-top w-100" alt="" />
                                <div className="px-4 rounded-bottom">
                                    <div className="service-content bg-primary text-center p-4 rounded">
                                        <h5 className="text-white">Những sản phẩm:</h5>
                                        <h3 className="mb-0">Theo gói combo</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <Link to={ROUTES.SHOP_PAGE}>
                            <div className="service-item bg-dark rounded border border-dark">
                                <img src="/img/nam-linhchi-kho-donggoi-1.jpg" className="img-fluid rounded-top w-100" alt="" />
                                <div className="px-4 rounded-bottom">
                                    <div className="service-content bg-light text-center p-4 rounded">
                                        <h5 className="text-primary">Những sản phẩm:</h5>
                                        <h3 className="mb-0">Khuyến mãi đặc biệt</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <Link to={ROUTES.SHOP_PAGE}>
                            <div className="service-item bg-primary rounded border border-primary">
                                <img src="/img/ruou-ngam-sam-bo-chinh-1.jpg" className="img-fluid rounded-top w-100" alt="" />
                                <div className="px-4 rounded-bottom">
                                    <div className="service-content bg-secondary text-center p-4 rounded">
                                        <h5 className="text-white">Những sản phẩm:</h5>
                                        <h3 className="mb-0">Đánh giá tích cực</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature