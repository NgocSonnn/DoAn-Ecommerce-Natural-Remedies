import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Modal, Button, message, Pagination } from 'antd';
import { actDeleteOderById, actFetchAllOrders, setNewPage } from '../../redux/features/order/orderSlice';
import './style.scss'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ROUTES } from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HistoryPurchaseComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { orders, pagination } = useSelector((state) => state.order);
    const { userInfo, isLogin } = useSelector(state => state.user)
    const [cartsInOrders, setCartsInOrder] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectOrder, setSelectOrder] = useState(null);

    const [provinceName, setProvinceName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [wardName, setWardName] = useState('');
    const [searchKeyState, setSearchKeyState] = useState('')


    const userOrders = orders.filter(order => order.fullName === userInfo.fullName && order.email === userInfo.email && order.phoneNumber === userInfo.phoneNumber);

    useEffect(() => {
        if (!isLogin) {
            navigate(ROUTES.PAGE_404)
            message.warning("Bạn cần đăng nhập để vào trang này!")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    const showModal = (id) => {
        const order = userOrders.find(order => order.id === id);
        setIsModalOpen(true);
        setCartsInOrder(order.cartItems);
        setSelectOrder(order);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleDelete = async (id) => {
        try {
            await dispatch(actDeleteOderById(id)).unwrap();
            message.success("Đơn hàng đã được xóa thành công!");
            dispatch(actFetchAllOrders());
        } catch (error) {
            message.error("Xóa đơn hàng thất bại!");
        }
    };
    const confirmDelete = (id) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa đơn hàng này?',
            content: 'Hành động này không thể hoàn tác.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: () => handleDelete(id),
        });
    };

    useEffect(() => {
        dispatch(actFetchAllOrders({
            _page: 1,
            _limit: pagination.limitPerPage,
            q: searchKeyState,
            phoneNumber: userInfo.phoneNumber,
        }

        ))
        return () => {
            dispatch(setNewPage(1))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            title: 'Đơn hàng',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: 'Ngày mua',
            dataIndex: 'checkoutDate',
            key: 'checkoutDate',
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },

        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Xử lý',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Button style={{ paddingRight: "30px" }} type="link" icon={<EyeOutlined />} onClick={() => showModal(record.id)}>Xem chi tiết</Button>
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => confirmDelete(record.id)}
                    >
                        Xóa
                    </Button>
                </div>
            ),
        },
    ];
    const handleChangeInputSearch = (event) => {
        const value = event.target.value
        setSearchKeyState(value)
    }
    const handleSubmitSearch = (event) => {
        event.preventDefault();
        dispatch(actFetchAllOrders({
            _page: 1,
            _limit: pagination.limitPerPage,
            q: searchKeyState,
            phoneNumber: userInfo.phoneNumber,
        }))
        dispatch(setNewPage(1))
    }
    const handleChangePage = (newPage) => {
        dispatch(setNewPage(newPage));
        dispatch(actFetchAllOrders({
            _page: newPage,
            _limit: pagination.limitPerPage,
            q: searchKeyState,
            phoneNumber: userInfo.phoneNumber,
        }))
    }
    const dataSource = userOrders.map(order => ({
        key: order.id,
        orderNumber: order.id,
        checkoutDate: order.checkoutDate,
        fullName: order.fullName,
        phoneNumber: order.phoneNumber,
        address: order.streetAddress + " " + wardName + " " + districtName + " " + provinceName,
        id: order.id,
    }));
    const renderCart = (_cart) => {
        return _cart.map((cart) => {
            const formatPrice = (price) => {
                return typeof price === "string" ? parseInt(price) : price;
            };
            return (
                <tr key={cart.id}>
                    <th scope="row">
                        <div className="d-flex align-items-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={cart.productImg} className="img-fluid rounded-circle" style={{ width: "80px", height: "80px" }} alt="" />
                        </div>
                    </th>
                    <td><p className="mb-0 mt-4">{cart.nameProduct}</p></td>
                    <td><p className="mb-0 mt-4">{formatPrice(cart.price)}K VNĐ/{cart.weight}</p></td>
                    <td>
                        <div className="input-group quantity mt-4" style={{ width: "100px" }}>
                            <input style={{ backgroundColor: "transparent" }} type="text" min={1} value={cart.quantity} className="form-control form-control-sm text-center border-0" disabled />
                        </div>
                    </td>
                    <td><p className="mb-0 mt-4">{formatPrice(cart.price * cart.quantity)}K VNĐ</p></td>
                </tr>
            );
        });
    };


    return (
        <div className="purchase-history-wrapper">
            <h2>Lịch sử mua hàng</h2>
            <div style={{ display: 'flex', justifyContent: 'end', paddingBottom: '10px' }}>
                <div className="col-xl-3">
                    <div className="input-group w-100 mx-auto d-flex">
                        <form style={{ display: 'flex' }} onSubmit={handleSubmitSearch}>
                            <input type="search" className="form-control p-3" placeholder="Tìm kiếm..." aria-describedby="search-icon-1"
                                value={searchKeyState}
                                onChange={handleChangeInputSearch}
                            />
                            <button type='submit'
                                style={{ border: "none", backgroundColor: "transparent" }}><span style={{ height: "58px", borderRadius: "0 10px 10px 0" }} id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                className="purchase-history-table"
            />
            <div className="row g-4">
                <Pagination style={{ marginTop: 40, justifyContent: "end" }}
                    defaultPageSize={pagination.limitPerPage}
                    current={pagination.currentPage}
                    total={pagination.total}
                    onChange={handleChangePage}>

                </Pagination>
            </div>
            <Modal
                className='modal-history'
                title="Chi tiết đơn hàng"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
                <div className='table-infor'>
                    <p><strong>Đơn hàng:</strong> {selectOrder?.id}</p>
                    <p><strong>Ngày mua:</strong> {selectOrder?.checkoutDate}</p>
                    <p><strong>Họ tên:</strong> {selectOrder?.fullName}</p>
                    <p><strong>Email:</strong> {selectOrder?.email}</p>
                    <p><strong>Số điện thoại:</strong> {selectOrder?.phoneNumber}</p>
                    <p><strong>Tổng thanh toán:</strong> {selectOrder?.total}K VND</p>
                    <p><strong>Phương thức thanh toán:</strong> {selectOrder?.paymentMethod}</p>
                    <p><strong>Địa chỉ ship:</strong> {selectOrder?.streetAddress} {wardName} {districtName} {provinceName}</p>
                    <p><strong>Địa chỉ ship khác:</strong> {selectOrder?.anotherAddress}</p>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tổng cộng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderCart(cartsInOrders)}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </div>
    );
};

export default HistoryPurchaseComponent;
