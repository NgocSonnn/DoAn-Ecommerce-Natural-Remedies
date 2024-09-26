import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { actDeleteProductInCarts, actUpdateQuantityOfProduct } from '../../redux/features/cart/cartSlice';
import { message, Modal } from 'antd';

const CartComponent = () => {
    const cartItems = useSelector((state) => state.carts?.carts || []);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.carts)
    const { isLogin } = useSelector((state) => state.user);
    const handleRedirectCheckOut = () => {
        if (!isLogin) {
            message.warning("Bạn cần đăng nhập để tiếp tục thanh toán. Vui lòng đăng nhập hoặc đăng ký!");
            navigate(ROUTES.LOGIN_PAGE);
            return;
        }
        navigate(ROUTES.CHECKOUT_PAGE)
    }
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
    const handleApplyDiscount = () => {
        message.warning("Mã giảm giá sai hoặc đã hết!")
    }
    const renderCart = (_cart) => {
        return _cart.map((cart) => {
            const handleDeleteItem = (itemId) => {
                Modal.confirm({
                    title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
                    content: 'Hành động này không thể hoàn tác.',
                    okText: 'Xóa',
                    okType: 'danger',
                    cancelText: 'Hủy',
                    onOk: () => dispatch(actDeleteProductInCarts(itemId))
                })
            }
            const handleQuantityChange = (id, newQuantity) => {
                if (newQuantity < 1) {
                    return
                } else {
                    dispatch(actUpdateQuantityOfProduct({ id, quantity: newQuantity }))
                }
            }
            const handleIncrement = (id, currentQuantity) => {
                handleQuantityChange(id, currentQuantity + 1);
            };

            const handleDecrement = (id, currentQuantity) => {
                if (currentQuantity > 1) {
                    handleQuantityChange(id, currentQuantity - 1);
                }
            };
            const formatPrice = (price) => {
                const numberPrice = typeof price === "string" ? parseInt(price) : price;
                return numberPrice
            };

            return <tr key={cart.id}>
                <th scope="row">
                    <div className="d-flex align-items-center">
                        <img src={cart.productImg} className="img-fluid me-5 rounded-circle" style={{ width: "80px", height: "80px" }} alt="" />
                    </div>
                </th>
                <td>
                    <p className="mb-0 mt-4">{cart.nameProduct}</p>
                </td>
                <td>
                    <p className="mb-0 mt-4">{formatPrice(cart.price)}K VNĐ/{cart.weight}</p>
                </td>
                <td>
                    <div className="input-group quantity mt-4" style={{ width: "100px" }}>
                        <div className="input-group-btn">
                            <button onClick={() => handleDecrement(cart.id, cart.quantity)} className="btn btn-sm btn-minus rounded-circle bg-light border" >
                                <i className="fa fa-minus"></i>
                            </button>
                        </div>
                        <input style={{ backgroundColor: "transparent" }} type="text" min={1} value={cart.quantity} onChange={(e) => { handleQuantityChange(cart.id, parseInt(e.target.value)) }} className="form-control form-control-sm text-center border-0" disabled />
                        <div className="input-group-btn">
                            <button onClick={() => handleIncrement(cart.id, cart.quantity)} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </td>
                <td>
                    <p className="mb-0 mt-4">{formatPrice(cart.price * cart.quantity)}K VNĐ</p>
                </td>
                <td>
                    <button onClick={() => { handleDeleteItem(cart.id) }} className="btn btn-md rounded-circle bg-light border mt-4" >
                        <i className="fa fa-times text-danger"></i>
                    </button>
                </td>

            </tr>
        })
    }
    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tổng cộng</th>
                                <th scope="col">Xử lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderCart(carts)}
                        </tbody>
                    </table>
                </div>
                <div className="mt-5">
                    <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Mã giảm giá" />
                    <button onClick={handleApplyDiscount} className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Áp dụng mã giảm giá</button>
                </div>
                <div className="row g-4 justify-content-end">
                    <div className="col-8"></div>
                    <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                        <div className="bg-light rounded">
                            <div className="p-4">
                                <h1 className="display-6 mb-4">Tổng số tiền</h1>
                                <div className="d-flex justify-content-between mb-4 align-items-center">
                                    <h5 className="mb-0 me-4">Tạm tính:</h5>
                                    <p className="mb-0">{formatPrice(total)}K VNĐ</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 m-0  me-4">Phí ship:</h5>
                                    <div className="">
                                        <p className="mb-0 m-0">miễn phí</p>
                                    </div>
                                </div>
                            </div>
                            <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 m-0 ps-4 me-4">Tổng:</h5>
                                <p className="mb-0 m-0 pe-4">{formatPrice(total)}K VNĐ</p>
                            </div>
                            <button onClick={handleRedirectCheckOut} className="btn border-secondary rounded-pill px-4 py-3 text-primary mb-4 ms-4">Tiến hành thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartComponent