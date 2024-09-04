import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const BannerSection = () => {
    const navigate = useNavigate()
    const handleClickBuy = () => {
        navigate(ROUTES.SHOP_PAGE)
    }

    return (
        <div className="container-fluid banner bg-secondary my-5">
            <div className="container py-5">
                <div className="row g-4 align-items-center">
                    <div className="col-lg-6">
                        <div className="py-4">
                            <h1 className="display-2 text-white">Ưu đãi và Khuyến mãi</h1>
                            <p className="fw-normal display-5 text-dark mb-4">Giảm 20% cho tất cả các sản phẩm của chúng tôi trong tháng này!</p>
                            <p className="mb-4 text-dark">Chúng tôi cam kết tất cả sản phẩm đều 100% tự nhiên và an toàn cho sức khỏe!</p>
                            <button onClick={handleClickBuy} className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5">MUA</button>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="position-relative">
                            <img src="img/baner-1.png" className="img-fluid w-100 rounded" alt="" />
                            <div className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute" style={{ width: "140px", height: "140px", top: 0, left: 0 }}>
                                <h1 style={{ fontSize: "15px", marginLeft: "12px" }}>SELL OFF</h1>
                                <div className="d-flex flex-column" style={{ marginBottom: "10px", marginRight: "10px" }}>
                                    <span style={{ fontSize: "80px", color: "#800020", fontWeight: 900 }} className="h2 mb-0">20</span>
                                    <span style={{ fontWeight: 900, marginTop: "-15px", textAlign: "center", color: "#800020" }} className="h3 mb-0">%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerSection