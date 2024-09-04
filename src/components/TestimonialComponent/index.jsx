import { Carousel } from 'antd'
import React from 'react'


const TestimonialComponent = () => {

    return (

        <div className="container-fluid testimonial py-5">
            <div className="container py-5">
                <div className="testimonial-header text-center">
                    <h4 className="text-primary">Ý kiến đánh giá về chúng tôi</h4>
                    <h1 className="display-5 mb-5 text-dark">Lời nhận xét của khách hàng!</h1>
                </div>
                <Carousel autoplay>
                    <div className="testimonial-item img-border-radius bg-light rounded p-4">
                        <div className="position-relative">
                            <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ right: 0, bottom: "30px" }}></i>
                            <div className="mb-4 pb-4 border-bottom border-secondary">
                                <h5 className="mb-0">"Tôi rất hài lòng với dịch vụ và sản phẩm của Natural Remedies. Sản phẩm của họ luôn tươi mới và an toàn cho sức khỏe." 🌼💚
                                </h5>
                            </div>
                            <div className="d-flex align-items-center flex-nowrap">
                                <div className="bg-secondary rounded">
                                    <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: "100px", height: "100px" }} alt="" />
                                </div>
                                <div className="ms-4 d-block">
                                    <h4 className="text-dark">Trần Văn A</h4>
                                    <p className="m-0 pb-3">Doanh nhân</p>
                                    <div className="d-flex pe-5">
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-item img-border-radius bg-light rounded p-4">
                        <div className="position-relative">
                            <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ right: 0, bottom: "30px" }}></i>
                            <div className="mb-4 pb-4 border-bottom border-secondary">
                                <h5 className="mb-0">"Sản phẩm từ Natural Remedies thực sự đã thay đổi cuộc sống của tôi. Chất lượng tuyệt vời và hiệu quả rõ rệt!" 🌿✨
                                </h5>
                            </div>
                            <div className="d-flex align-items-center flex-nowrap">
                                <div className="bg-secondary rounded">
                                    <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: "100px", height: "100px" }} alt="" />
                                </div>
                                <div className="ms-4 d-block">
                                    <h4 className="text-dark">Nguyễn Thị B</h4>
                                    <p className="m-0 pb-3">Làm nông</p>
                                    <div className="d-flex pe-5">
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-item img-border-radius bg-light rounded p-4">
                        <div className="position-relative">
                            <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ right: 0, bottom: "30px" }}></i>
                            <div className="mb-4 pb-4 border-bottom border-secondary">
                                <h5 className="mb-0">"Đây là nơi tôi tìm thấy những giải pháp tự nhiên tốt nhất. Các sản phẩm của Natural Remedies không chỉ hiệu quả mà còn thân thiện với môi trường." 🍃🌟
                                </h5>
                            </div>
                            <div className="d-flex align-items-center flex-nowrap">
                                <div className="bg-secondary rounded">
                                    <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: "100px", height: "100px" }} alt="" />
                                </div>
                                <div className="ms-4 d-block">
                                    <h4 className="text-dark">Nguyễn Ngọc C</h4>
                                    <p className="m-0 pb-3">Buôn bán</p>
                                    <div className="d-flex pe-5">
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star-half-alt text-primary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><div className="testimonial-item img-border-radius bg-light rounded p-4">
                        <div className="position-relative">
                            <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ right: 0, bottom: "30px" }}></i>
                            <div className="mb-4 pb-4 border-bottom border-secondary">
                                <h5 className="mb-0">"Tôi đã sử dụng sản phẩm của Natural Remedies và thấy sự cải thiện rõ rệt trong sức khỏe của mình. Chất lượng vượt trội và đáng để mua." 🌱💪
                                </h5>
                            </div>
                            <div className="d-flex align-items-center flex-nowrap">
                                <div className="bg-secondary rounded">
                                    <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: "100px", height: "100px" }} alt="" />
                                </div>
                                <div className="ms-4 d-block">
                                    <h4 className="text-dark">Hoàng Thị D</h4>
                                    <p className="m-0 pb-3">Cán bộ</p>
                                    <div className="d-flex pe-5">
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><div className="testimonial-item img-border-radius bg-light rounded p-4">
                        <div className="position-relative">
                            <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ right: 0, bottom: "30px" }}></i>
                            <div className="mb-4 pb-4 border-bottom border-secondary">
                                <h5 className="mb-0">"Natural Remedies cung cấp những sản phẩm tuyệt vời với dịch vụ khách hàng xuất sắc. Tôi cảm thấy yên tâm và tin tưởng khi mua sắm ở đây." 🌺👍
                                </h5>
                            </div>
                            <div className="d-flex align-items-center flex-nowrap">
                                <div className="bg-secondary rounded">
                                    <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: "100px", height: "100px" }} alt="" />
                                </div>
                                <div className="ms-4 d-block">
                                    <h4 className="text-dark">Cao Thanh D</h4>
                                    <p className="m-0 pb-3">IT</p>
                                    <div className="d-flex pe-5">
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star text-primary"></i>
                                        <i className="fas fa-star-half-alt text-primary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default TestimonialComponent