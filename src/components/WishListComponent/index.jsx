import React, { useEffect, useState } from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actDeleteWishListById, actFetchAllWishLists, actFetchAllWishListsByUserId, setNewPage } from '../../redux/features/wishList/wishListSlice'
import { generatePath, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { message, Modal, Pagination } from 'antd'

const WishListComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { wishLists, pagination } = useSelector(state => state.wishLists)
    const { userInfo, isLogin } = useSelector(state => state.user)
    const [searchKeyState, setSearchKeyState] = useState('')

    useEffect(() => {
        if (!isLogin) {
            navigate(ROUTES.PAGE_404)
            message.warning("Bạn cần đăng nhập để vào trang này!")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const filterWishLists = wishLists.filter(wishList => {
        return wishList.userId === userInfo.id
    });

    const renderWishList = (_wishList) => {

        return _wishList.map((wishLists) => {
            const handleClickToProductDetail = () => {
                const productId = wishLists.wishList.productId
                navigate(generatePath(ROUTES.SHOP_DETAIL_PAGE, { productId }))
            }
            const handleDeleteItem = (itemId) => {
                Modal.confirm({
                    title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
                    content: 'Hành động này không thể hoàn tác.',
                    okText: 'Xóa',
                    okType: 'danger',
                    cancelText: 'Hủy',
                    onOk: () => dispatch(actDeleteWishListById(itemId))
                        .then(() => dispatch(actFetchAllWishListsByUserId({
                            _page: pagination.currentPage,
                            _limit: pagination.limitPerPage,
                            q: searchKeyState,
                            userId: userInfo.id
                        })))
                        .then(() => dispatch(actFetchAllWishLists()))
                });

            }
            const formatPrice = (price) => {
                const numberPrice = typeof price === "string" ? parseInt(price) : price;
                return numberPrice
            };

            return <tr key={wishLists.id}>
                <th scope="row">
                    <div className="d-flex align-items-center">
                        <img src={wishLists.wishList.productImg} className="img-fluid me-5 rounded-circle" style={{ width: "80px", height: "80px" }} alt="" />
                    </div>
                </th>
                <td>
                    <p onClick={handleClickToProductDetail} className="nameProduct-detail mb-0 mt-4">{wishLists.wishList.nameProduct}</p>
                </td>
                <td>
                    <p className="mb-0 mt-4">{formatPrice(wishLists.wishList.price)}K VNĐ/{wishLists.wishList.weight}</p>
                </td>
                <td>
                    <button onClick={() => { handleDeleteItem(wishLists.id) }} className="btn btn-md rounded-circle bg-light border mt-4" >
                        <i className="fa fa-times text-danger"></i>
                    </button>
                </td>

            </tr>
        })
    }
    const handleChangeInputSearch = (event) => {
        const value = event.target.value
        setSearchKeyState(value)
    }
    const handleSubmitSearch = (event) => {
        event.preventDefault();
        dispatch(actFetchAllWishListsByUserId({
            _page: 1,
            _limit: pagination.limitPerPage,
            q: searchKeyState,
            userId: userInfo.id
        }))
        dispatch(setNewPage(1))
    }
    const handleChangePage = (newPage) => {
        dispatch(setNewPage(newPage));
        dispatch(actFetchAllWishListsByUserId({
            _page: newPage,
            _limit: pagination.limitPerPage,
            q: searchKeyState,
            userId: userInfo.id
        }))
    }
    useEffect(() => {
        dispatch(actFetchAllWishListsByUserId({
            _page: 1,
            _limit: pagination.limitPerPage,
            q: searchKeyState,
            userId: userInfo.id
        }))
        return () => {
            dispatch(setNewPage(1))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='wishList-container'>
            <div >
                <h3>Danh sách sản phẩm yêu thích của bạn</h3>
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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Xử lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderWishList(filterWishLists)}
                    </tbody>
                </table>
                <div className="row g-4">
                    <Pagination style={{ marginTop: 40, justifyContent: "end" }}
                        defaultPageSize={pagination.limitPerPage}
                        current={pagination.currentPage}
                        total={pagination.total}
                        onChange={handleChangePage}>
                    </Pagination>
                </div>
            </div></div>
    )
}

export default WishListComponent