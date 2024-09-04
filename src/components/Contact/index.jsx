import React from 'react'

const ContactComponent = () => {
    return (
        <div className="container-fluid contact py-5">
            <div className="container py-5">
                <div className="p-5 bg-light rounded">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="text-center mx-auto" style={{ maxWidth: "700px" }}>
                                <h1 className="text-primary">Liên hệ với chúng tôi</h1>
                                <p className="mb-4">Quý khách có thể nhấn vào liên kết dưới đây để xem vị trí chính xác của cửa hàng chúng tôi.</p>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="h-100 rounded">
                                <iframe className="rounded w-100"
                                    style={{ height: "400px" }} src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d957.4821462701491!2d107.22896427564241!3d16.27543028388079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDE2JzMxLjUiTiAxMDfCsDEzJzQ4LjciRQ!5e0!3m2!1svi!2s!4v1724361056368!5m2!1svi!2s"
                                    loading="lazy" title='iframe' referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <form action="" className="">
                                <input type="text" className="w-100 form-control border-0 py-3 mb-4" placeholder="Tên của bạn" />
                                <input type="number" className="w-100 form-control border-0 py-3 mb-4" placeholder="Nhập số điện thoại của bạn" />
                                <textarea className="w-100 form-control border-0 mb-4" rows="5" cols="10" placeholder="Lời nhắn của bạn"></textarea>
                                <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary " type="submit">Gửi</button>
                            </form>
                        </div>
                        <div className="col-lg-5">
                            <div className="d-flex p-4 rounded mb-4 bg-white">
                                <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                                <div>
                                    <h4>Địa chỉ</h4>
                                    <p className="mb-2">3 Nguyễn Thức Tự, thị trấn A Lưới, huyện A Lưới, tỉnh Thừa Thiên Huế</p>
                                </div>
                            </div>
                            <div className="d-flex p-4 rounded mb-4 bg-white">
                                <i className="fab fa-facebook-f fa-2x text-primary me-4"></i>
                                <div>
                                    <h4>Facebook</h4>
                                    <p style={{ wordBreak: "break-word" }} className="mb-2">https://www.facebook.com/profile.php?id=100015270968166</p>
                                </div>
                            </div>
                            <div className="d-flex p-4 rounded bg-white">
                                <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                                <div>
                                    <h4>Số điện thoại</h4>
                                    <p className="mb-2">(+84) 363041668</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactComponent