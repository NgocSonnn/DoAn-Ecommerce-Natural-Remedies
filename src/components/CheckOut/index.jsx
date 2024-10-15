import axios from 'axios'
import { format, parseISO } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actAddBill } from '../../redux/features/checkOut/checkOutSlice'
import { actClearCart } from '../../redux/features/cart/cartSlice'
import { message } from 'antd'
import emailjs from '@emailjs/browser'
import { actAddOrder } from '../../redux/features/order/orderSlice'
import { actUpdateProductPurchases } from '../../redux/features/product/productSlice'
import { setDiscountAmount } from '../../redux/features/coupons/couponsSlice'

export const CheckOutComponent = () => {
    const cartItems = useSelector(state => state.carts.carts)
    const { carts } = useSelector(state => state.carts)
    const userInfo = useSelector(state => state.user.userInfo)

    const [provinceName, setProvinceName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [wardName, setWardName] = useState('');
    const [anotherAddress, setAnotherAddress] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [showAnotherAddress, setShowAnotherAddress] = useState(false);
    const [checkoutDate, setCheckoutDate] = useState(new Date());
    const { discount } = useSelector((state) => state.coupons);


    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo.province) {
            axios
                .get(`https://provinces.open-api.vn/api/p/${userInfo.province}`)
                .then((response) => {
                    setProvinceName(response.data.name);
                })
                .catch((error) => {
                    console.error("Error fetching province:", error);
                });
        }
    }, [userInfo.province]);

    useEffect(() => {
        if (userInfo.district) {
            axios
                .get(`https://provinces.open-api.vn/api/d/${userInfo.district}`)
                .then((response) => {
                    setDistrictName(response.data.name);
                })
                .catch((error) => {
                    console.error("Error fetching district:", error);
                });
        }
    }, [userInfo.province, userInfo.district]);

    useEffect(() => {
        if (userInfo.ward) {
            axios
                .get(`https://provinces.open-api.vn/api/w/${userInfo.ward}`)
                .then((response) => {
                    setWardName(response.data.name);
                })
                .catch((error) => {
                    console.error("Error fetching ward:", error);
                });
        }
    }, [userInfo.ward]);

    const formatToDDMMYYYY = (isoDateString) => {
        const date = parseISO(isoDateString);
        return format(date, 'dd/MM/yyyy');
    };
    const formatDate = formatToDDMMYYYY(userInfo.birthDay)
    const formatCheckoutDate = formatToDDMMYYYY(checkoutDate.toISOString());


    const calculateTotal = useCallback(() =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]
    )
    const calculateTotalDisCount = useCallback(() => {
        const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        return (total - ((total * discount) / 100))
    }, [cartItems, discount]
    )
    const [total, setTotal] = useState(calculateTotal())
    const [totalDiscount, setTotalDiscount] = useState(calculateTotalDisCount())
    useEffect(() => {
        setTotal(calculateTotal());
        setTotalDiscount(calculateTotalDisCount());
    }, [cartItems, calculateTotal, calculateTotalDisCount]);


    const formatPrice = (price) => {
        const numberPrice = typeof price === "string" ? parseInt(price) : price;
        return numberPrice
    };

    const formatCartItemsForEmail = (items) => {
        return items.map(item =>
            `Tên sản phẩm: ${item.nameProduct}, Giá: ${formatPrice(item.price)}000 VNĐ, Trọng lượng: ${item.weight}, Số lượng: ${item.quantity}`
        ).join('\n');
    };
    const sendEmail = (data) => {
        emailjs.send('service_9vnj7mc', 'template_d2zvvay', data, {
            publicKey: 'nVj-s9YXDWYlraXS_',
        }).then(
            (response) => {
                console.log('SUCCESS!', response.status, response.text);
            },
            (error) => {
                console.log('FAILED...', error);
            },
        );
    }
    useEffect(() => {
        setCheckoutDate(new Date());
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault()
        const formattedCartItems = formatCartItemsForEmail(cartItems);
        const checkoutData = {
            phoneNumber: userInfo.phoneNumber,
            fullName: userInfo.fullName,
            email: userInfo.email,
            birthDay: userInfo.birthDay,
            gender: userInfo.gender,
            province: provinceName,
            district: districtName,
            ward: wardName,
            streetAddress: userInfo.streetAddress,
            anotherAddress: anotherAddress,
            cartItems: formattedCartItems,
            total,
            discount,
            totalDiscount,
            paymentMethod,
            showAnotherAddress,
            checkoutDate: formatToDDMMYYYY(checkoutDate.toISOString())
        }
        const orderData = {
            phoneNumber: userInfo.phoneNumber,
            fullName: userInfo.fullName,
            email: userInfo.email,
            birthDay: userInfo.birthDay,
            gender: userInfo.gender,
            province: provinceName,
            district: districtName,
            ward: wardName,
            streetAddress: userInfo.streetAddress,
            anotherAddress: anotherAddress,
            cartItems,
            total,
            discount,
            totalDiscount,
            paymentMethod,
            showAnotherAddress,
            checkoutDate: checkoutDate
        }

        if (cartItems.length === 0) {
            message.warning("Vui lòng thêm sản phẩm để hoàn tất đơn hàng!")
            return
        }

        try {

            await dispatch(actAddBill(checkoutData)).unwrap();
            dispatch(actAddOrder(orderData)).unwrap()
            dispatch(actUpdateProductPurchases(cartItems));
            sendEmail(checkoutData)
            dispatch(actClearCart());
            dispatch(setDiscountAmount(null))
            // Reset form fields
            setAnotherAddress('');
            setPaymentMethod('');
            setShowAnotherAddress(false);
            setCheckoutDate(new Date());
            message.success("Đơn hàng của bạn đã được xử lý thành công!");

        } catch (error) {
            message.error("Đã xảy ra lỗi khi xử lý đơn hàng. Vui lòng thử lại.");
        }
    }

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
                <form onSubmit={handleSubmit}>
                    <div className="row g-5">
                        <div className="col-md-12 col-lg-6 col-xl-7">
                            <div className="form-item">
                                <label className="mt-3 mx-1">Số điện thoại</label>
                                <input defaultValue={userInfo.phoneNumber} name='phoneNumber' type="tel" className="form-control" disabled />
                            </div>
                            <div className="form-item">
                                <label className="mt-3 mx-1">Họ tên</label>
                                <input defaultValue={userInfo.fullName} name='fullName' type="text" className="form-control" disabled />
                            </div>
                            <div className="form-item">
                                <label className="mt-3 mx-1">Email</label>
                                <input defaultValue={userInfo.email} name='email' type="email" className="form-control" disabled />
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item w-100">
                                        <label className="mt-3 mx-1">Ngày sinh</label>
                                        <input defaultValue={formatDate} name='formatDate' type="text" className="form-control" disabled />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item w-100">
                                        <label className="mt-3 mx-1">Giới tính</label>
                                        <input defaultValue={userInfo.gender} name='gender' type="text" className="form-control" disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-lg-4">
                                    <div className="form-item w-100">
                                        <label className="mt-3 mx-1">Tỉnh/thành phố</label>
                                        <input defaultValue={provinceName} name='provinceName' type="text" className="form-control" disabled />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-4">
                                    <div className="form-item w-100">
                                        <label className="mt-3 mx-1">Quận/huyện</label>
                                        <input defaultValue={districtName} name='districtName' type="text" className="form-control" disabled />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-4">
                                    <div className="form-item w-100">
                                        <label className="mt-3 mx-1">Phường/xã</label>
                                        <input defaultValue={wardName} name='wardName' type="text" className="form-control" disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="form-item">
                                <label className="mt-3 mx-1">Toà nhà, số nhà, tên đường</label>
                                <input defaultValue={userInfo.streetAddress} name='streetAddress' type="text" className="form-control" disabled />
                            </div>
                            <div className="form-item">
                                <label className="mt-3 mx-1">Ngày đặt hàng</label>
                                <input
                                    value={formatCheckoutDate}
                                    name='checkoutDate'
                                    type="text"
                                    className="form-control"
                                    disabled
                                />
                            </div>
                            <hr />
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" id="Address-1" name="Address"
                                    onChange={(e) => setShowAnotherAddress(e.target.checked)} />
                                <label className="form-check-label" htmlFor="Address-1">Bạn muốn ship đến địa chỉ khác?</label>
                            </div>
                            <div className="form-item">
                                <textarea
                                    value={anotherAddress}
                                    onChange={(e) => setAnotherAddress(e.target.value)} name="anotherAddress" className="form-control" spellCheck="false" cols="30" rows="11" placeholder="Địa chỉ khác bạn muốn ship hoặc ghi chú bạn muốn nhắn gửi cho chúng tôi.         LƯU Ý: địa chỉ phải đầy đủ và chi tiết để tránh ship nhầm!                                            ví dụ: số 3 Nguyễn Thức Tự, thị trấn A Lưới, huyện A Lưới, Tỉnh Thừa Thiên Huế"></textarea>
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
                                                Tạm tính: {formatPrice(total)}K VNĐ
                                            </th>
                                            <td className="py-5">
                                                Giảm giá: {discount}%
                                            </td>
                                            <td className="py-5"></td>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark text-uppercase py-3"><b>TỔNG</b></p>
                                            </td>
                                            <td style={{ textAlign: "center" }} className="py-5">
                                                <div className="py-3 border-bottom border-top">
                                                    <p className="mb-0 m-0 text-dark"><b>{formatPrice(totalDiscount)}K VNĐ</b></p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input type="radio" className="form-check-input bg-primary border-0" id="Transfer-1" name="Payment" placeholder="Transfer" required
                                            value="Chuyển khoản ngân hàng"
                                            checked={paymentMethod === 'Chuyển khoản ngân hàng'}
                                            onChange={() => setPaymentMethod('Chuyển khoản ngân hàng')} />
                                        <label className="form-check-label" htmlFor="Transfer-1">Chuyển khoản ngân hàng</label>
                                    </div>
                                    <p className="text-start text-dark">Thanh toán trực tiếp vào tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn làm tham chiếu thanh toán. Đơn hàng của bạn sẽ không được giao cho đến khi tiền được chuyển vào tài khoản của chúng tôi.</p>
                                </div>
                            </div>
                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input
                                            value="Thanh toán khi nhận hàng"
                                            checked={paymentMethod === 'Thanh toán khi nhận hàng'}
                                            onChange={() => setPaymentMethod('Thanh toán khi nhận hàng')}
                                            type="radio" className="form-check-input bg-primary border-0" id="Delivery-1" name="Payment" placeholder="Delivery" required />
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