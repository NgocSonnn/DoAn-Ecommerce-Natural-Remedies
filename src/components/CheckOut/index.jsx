import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CheckOutComponent = () => {
    const cartItems = useSelector(state => state.carts.carts)
    const { carts } = useSelector(state => state.carts)

    const calculateTotal = useCallback(() =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]
    )
    const [total, setTotal] = useState(calculateTotal())
    useEffect(() => {
        setTotal(calculateTotal());
    }, [cartItems, calculateTotal]);

    const formatPrice = (price) => {
        const numberPrice = typeof price === "string" ? parseInt(price) : price;
        return numberPrice
    };

    const renderCheckOutCart = (_cart) => {
        return _cart.map((cart) => {
            return <tr key={cart.id}>
                <th scope="row">
                    <div className="d-flex align-items-center mt-2">
                        <img src={cart.productImg} className="rounded-circle" style={{ objectFit: "cover", width: "90px", height: "90px" }} alt="" />
                    </div>
                </th>
                <td className="py-5">{cart.nameProduct}</td>
                <td className="py-5">{formatPrice(cart.price)}K VNĐ</td>
                <td className="py-5">{cart.quantity}</td>
                <td className="py-5">{formatPrice(total)}K VNĐ</td>
            </tr>
        })
    }
    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <h1 className="mb-4">Thông tin hóa đơn</h1>
                <form action="#">
                    <div className="row g-5">
                        <div className="col-md-12 col-lg-6 col-xl-7">
                            <div className="row">
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item w-100">
                                        <label className="form-label my-3">Họ<sup>*</sup></label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item w-100">
                                        <label className="form-label my-3">Tên<sup>*</sup></label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Địa chỉ <sup>*</sup></label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="form-item">
                                <label className="form-label my-3">Số điện thoại<sup>*</sup></label>
                                <input type="tel" className="form-control" />
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Email<sup>*</sup></label>
                                <input type="email" className="form-control" />
                            </div>

                            <hr />
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" id="Address-1" name="Address" placeholder="Address" />
                                <label className="form-check-label" htmlFor="Address-1">Bạn muốn ship đến địa chỉ khác?</label>
                            </div>
                            <div className="form-item">
                                <textarea name="text" className="form-control" spellCheck="false" cols="30" rows="11" placeholder="Địa chỉ khác bạn muốn ship hoặc ghi chú bạn muốn nhắn gửi cho chúng tôi"></textarea>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-5">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sản phẩm</th>
                                            <th scope="col">Tên</th>
                                            <th scope="col">Giá</th>
                                            <th scope="col">Số lượng</th>
                                            <th scope="col">Tổng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderCheckOutCart(carts)}
                                        <tr>
                                            <th scope="row">
                                            </th>
                                            <td className="py-5">
                                            </td>
                                            <td className="py-5"></td>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark text-uppercase py-3"><b>TỔNG</b></p>
                                            </td>
                                            <td style={{ textAlign: "center" }} className="py-5">
                                                <div className="py-3 border-bottom border-top">
                                                    <p className="mb-0 m-0 text-dark"><b>{formatPrice(total)}K VNĐ</b></p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input type="radio" className="form-check-input bg-primary border-0" id="Transfer-1" name="Payment" placeholder="Transfer" required />
                                        <label className="form-check-label" htmlFor="Transfer-1">Chuyển khoản ngân hàng</label>
                                    </div>
                                    <p className="text-start text-dark">Thanh toán trực tiếp vào tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn làm tham chiếu thanh toán. Đơn hàng của bạn sẽ không được giao cho đến khi tiền được chuyển vào tài khoản của chúng tôi.</p>
                                </div>
                            </div>
                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input type="radio" className="form-check-input bg-primary border-0" id="Delivery-1" name="Payment" placeholder="Delivery" required />
                                        <label className="form-check-label" htmlFor="Delivery-1">Thanh toán khi nhận hàng</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                                <button type="submit" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Hoàn tất đơn hàng</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CheckOutComponent