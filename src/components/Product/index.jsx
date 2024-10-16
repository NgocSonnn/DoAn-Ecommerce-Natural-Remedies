import React, { useEffect } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { actAddProductToCarts } from '../../redux/features/cart/cartSlice'
import './style.scss'
import { HeartFilled } from '@ant-design/icons'
import { actAddWishList, actDeleteWishListById, actFetchAllWishLists, actFetchAllWishListsByUserId } from '../../redux/features/wishList/wishListSlice'
import { message, Modal } from 'antd'

const Product = (props) => {
    const naviage = useNavigate()
    const dispatch = useDispatch()
    const { wishLists } = useSelector(state => state.wishLists)
    const isLogin = useSelector(state => state.user.isLogin)
    const userInfo = useSelector(state => state.user.userInfo)
    useEffect(() => {
        if (userInfo) {
            dispatch(actFetchAllWishListsByUserId({ userId: userInfo.id }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]);

    const handleClickToProductDetail = () => {
        const productId = props.product.id
        naviage(generatePath(ROUTES.SHOP_DETAIL_PAGE, { productId }))
    }
    const existedItem = wishLists.find(
        (item) => item.userId === userInfo.id && item.wishList.productId === props.product.id
    );
    const handleToAddWishList = () => {
        if (!isLogin) {
            Modal.confirm({
                title: 'Chưa đăng nhập',
                content: 'Bạn cần đăng nhập để thêm sản phẩm vào danh sách yêu thích. Bạn có muốn đăng nhập ngay không?',
                okText: 'Đăng nhập',
                cancelText: 'Hủy',
                onOk() {
                    naviage(ROUTES.LOGIN_PAGE)
                },
                onCancel() {
                },
            })
            return;
        }
        const productWishList = {
            productId: props.product.id,
            productImg: props.product.productImg,
            weight: props.product.weight,
            price: props.product.price,
            nameProduct: props.product.nameProduct,
            quantity: 1,
        }

        if (existedItem) {
            const itemIdToDelete = existedItem.id;

            dispatch(actDeleteWishListById(itemIdToDelete))
                .then(() => dispatch(actFetchAllWishListsByUserId({
                    userId: userInfo.id
                }))).then(() => {
                    dispatch(actFetchAllWishLists());
                });
        } else {
            dispatch(actAddWishList({
                wishList: productWishList,
                userId: userInfo.id
            })).then(() => {
                dispatch(actFetchAllWishLists());
                message.success("Sản phẩm đã được thêm vào danh sách yêu thích!");
            })
        }
    }

    const handleToAddCart = () => {
        const productToAdd = {
            id: props.product.id,
            productImg: props.product.productImg,
            weight: props.product.weight,
            price: props.product.price,
            nameProduct: props.product.nameProduct,
            quantity: 1,
        }
        dispatch(actAddProductToCarts(productToAdd))

    }


    return (
        <div className="col-md-6 col-lg-4 col-xl-3" >
            <div style={{ height: "541px", display: "flex", flexDirection: "column", justifyContent: "space-between" }} className="rounded border border-secondary position-relative fruite-item">
                <div className="fruite-img">
                    <img style={{ height: "300px", objectFit: "cover" }} src={props.product.productImg} className="img-fluid w-100 rounded-top" alt="" />
                </div>
                <div onClick={handleToAddWishList} className={`wishList-style text-white bg-secondary px-3 py-1 rounded position-absolute ${existedItem ? "style-wishList-true" : "style-wishList-false"}`} style={{ top: "10px", left: "10px", cursor: "pointer" }}><HeartFilled className='wishList-style-icon' /></div>
                <div style={{ textAlign: "center" }} className="p-4  border-top-0 rounded-bottom">
                    <h4 onClick={handleClickToProductDetail} className='product-name-style'>{props.product.nameProduct}</h4>
                    <p> {props.product.description}</p>
                    <div className="d-flex justify-content-between flex-lg-wrap">
                        <p style={{ width: "100%" }} className="text-dark fs-5 fw-bold mb-0">{props.product.price}K/{props.product.weight}</p>
                        <button onClick={handleToAddCart} style={{ width: "100%" }} className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product