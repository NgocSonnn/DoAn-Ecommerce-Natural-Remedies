import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllProduct, actFetchProductById, setBestSellProduct, setSearchKey } from '../../redux/features/product/productSlice'
import { generatePath, Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import './style.scss'
import { actAddProductToCarts } from '../../redux/features/cart/cartSlice'
import { Form, Input, Button, Rate, Row, Col, Pagination, Spin, Alert, Modal, message } from 'antd';
import { actAddComment, actFetchAllComments, setNewPage } from '../../redux/features/comment/commentSlice'
import { format } from 'date-fns'
import { HeartFilled } from '@ant-design/icons'
import { actAddWishList, actFetchAllWishLists } from '../../redux/features/wishList/wishListSlice'

const ShopDetail = () => {
    const { products, productInfo } = useSelector((state) => state.product)
    const comments = useSelector((state) => state.comment.comments);
    const { pagination, sortField, sortOrder } = useSelector((state) => state.comment);
    const isLoading = useSelector((state) => state.comment.isLoading);
    const errors = useSelector((state) => state.comment.errors);
    const isLogin = useSelector(state => state.user.isLogin)
    const userInfo = useSelector(state => state.user.userInfo)
    const wishLists = useSelector(state => state.wishLists.wishLists)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [quantity, setquantity] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();


    const handleSortBestSeller = (event) => {
        event.preventDefault();
        dispatch(setBestSellProduct(products))
        navigate(ROUTES.SHOP_PAGE)
    }
    const handleChangeInputSearch = (event) => {
        const value = event.target.value
        dispatch(setSearchKey(value))
    }
    const handleSubmitSearch = (event) => {
        event.preventDefault();
        navigate(ROUTES.SHOP_PAGE)
    }
    const handleToAddCart = () => {
        const productToAdd = {
            id: productInfo.id,
            productImg: productInfo.productImg,
            weight: productInfo.weight,
            price: productInfo.price,
            nameProduct: productInfo.nameProduct,
            quantity: quantity,
        }
        dispatch(actAddProductToCarts(productToAdd))
    }
    useEffect(() => {
        dispatch(actFetchProductById(params.productId))
        dispatch(actFetchAllProduct())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const relatedProductList = products.filter(products => (products.brandId === productInfo.brandId)).sort((a, b) => b.purchase - a.purchase).slice(0, 8)

    const renderRelatedProduct = (relatedProduct) => {
        return relatedProduct.map((product) => {
            const handleClickToProductDetail = () => {
                const productId = product.id
                navigate(generatePath(ROUTES.SHOP_DETAIL_PAGE, { productId }))
                window.location.reload();
            }
            const handleToAddWishList = () => {
                if (!isLogin) {
                    Modal.confirm({
                        title: 'Chưa đăng nhập',
                        content: 'Bạn cần đăng nhập để thêm sản phẩm vào danh sách yêu thích. Bạn có muốn đăng nhập ngay không?',
                        okText: 'Đăng nhập',
                        cancelText: 'Hủy',
                        onOk() {
                            navigate(ROUTES.LOGIN_PAGE)
                        },
                        onCancel() {
                        },
                    })
                    return
                }
                const productWishList = {
                    productId: product.id,
                    productImg: product.productImg,
                    weight: product.weight,
                    price: product.price,
                    nameProduct: product.nameProduct,
                    quantity: 1,
                }
                const existedItem = wishLists.find(
                    (item) => item.userId === userInfo.id && item.wishList.productId === productWishList.productId
                );

                if (existedItem) {
                    message.error("Bạn đã thêm sản phẩm này vào danh sách yêu thích!");
                } else {
                    dispatch(actAddWishList({
                        wishList: productWishList,
                        userId: userInfo.id
                    })).then(() => dispatch(actFetchAllWishLists()));
                }
            }
            const handleToAddCart = () => {
                const productToAdd = {
                    id: product.id,
                    productImg: product.productImg,
                    weight: product.weight,
                    price: product.price,
                    nameProduct: product.nameProduct,
                    quantity: quantity,
                }
                dispatch(actAddProductToCarts(productToAdd))

            }
            return <div key={product.id} className="col-md-6 col-lg-4 col-xl-3 ">
                <div style={{ height: "541px", display: "flex", flexDirection: "column", justifyContent: "space-between" }} className='border border-primary rounded position-relative  vesitable-item' >
                    <div className="vesitable-img">
                        <img style={{ height: "320px", objectFit: "cover" }} src={product.productImg} className="img-fluid w-100 rounded-top" alt="" />
                    </div>
                    <div onClick={handleToAddWishList} className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px", cursor: "pointer" }}><HeartFilled /></div>
                    <div style={{ textAlign: "center" }} className="p-4 pb-0 rounded-bottom">
                        <h4 onClick={handleClickToProductDetail} className='product-name-style'>{product.nameProduct}</h4>
                        <p>{product.description}</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                            <p style={{ width: "100%", textAlign: "center" }} className=" text-dark fs-5 fw-bold">{product.price}K VNĐ/{product.weight}</p>
                            <button onClick={handleToAddCart} style={{ width: "100%" }} className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i>Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        }
        )
    }
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const updatedValues = {
            productId: Number(params.productId),
            ...values,
            createdAt: new Date().toISOString()
        };
        dispatch(actAddComment(updatedValues))
        form.resetFields();
    };

    const filterCommentByProductId = comments.filter(comment =>
        comment.productId === Number(params.productId)
    )

    useEffect(() => {
        const currentPage = Number(searchParams.get('_page')) || 1;
        dispatch(actFetchAllComments({
            _page: currentPage,
            _limit: pagination.limitPerPage,
            _sort: sortField,
            _order: sortOrder,
            productId: params.productId
        }))
        return () => {
            dispatch(setNewPage(currentPage))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.productId])
    const handlePageChange = (newPage) => {
        dispatch(setNewPage(newPage));
        setSearchParams({
            ...Object.fromEntries(searchParams),
            _page: newPage,
            _limit: pagination.limitPerPage
        });
        dispatch(actFetchAllComments({
            _page: newPage,
            _limit: pagination.limitPerPage,
            _sort: sortField,
            _order: sortOrder
        }));
    };
    const renderComments = (_comment) => {
        return _comment.map((comment) => {

            const { fullName, comments, rating, createdAt, phoneNumber } = comment;
            const date = format(createdAt, 'dd/MM/yyyy HH:mm')

            const stars = [];
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    stars.push(<i key={i} className="fa fa-star text-secondary"></i>);
                } else if (i - rating === 0.5) {
                    stars.push(<i key={i} className="fa fa-star-half-alt text-secondary"></i>);
                } else {
                    stars.push(<i key={i} className="fa fa-star-o text-secondary"></i>);
                }
            }
            return (
                <div className="d-flex p-3" key={comment.id}>
                    <img src="/img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: "100px", height: "100px" }} alt="" />
                    <div className="w-100">
                        <p className="mb-2" style={{ fontSize: "14px" }}>Ngày: {date}</p>
                        <div style={{ alignItems: "center" }} className="d-flex justify-content-between">
                            <h5 style={{ margin: 0 }}>Họ tên: {fullName}</h5>
                            <p style={{ margin: 0 }}>Số điện thoại: {phoneNumber}</p>
                            <div style={{ margin: 0 }} className="d-flex mb-3">
                                {stars}
                            </div>
                        </div>
                        <p>Nhận xét: " <b>{comments}</b> "</p>
                    </div>
                </div>
            )
        })
    }

    const handleQuantityChange = (newQuantity) => {

        if (newQuantity < 1) {
            return
        } else {
            setquantity(newQuantity)
        }
    }
    const handleIncrement = (currentQuantity) => {
        handleQuantityChange(currentQuantity + 1);
    };

    const handleDecrement = (currentQuantity) => {
        if (currentQuantity > 1) {
            handleQuantityChange(currentQuantity - 1);
        }
    };
    useEffect(() => {
        const _page = searchParams.get('_page')
        if (_page) {
            dispatch(setNewPage(_page))
        }

        dispatch(actFetchAllComments({
            _page: _page,
            _limit: pagination.limitPerPage,
            _sort: sortField,
            _order: sortOrder,
            productId: params.productId
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="container-fluid py-5 mt-5">
            <div className="container py-5">
                <div className="row g-4 mb-5">
                    <div className="col-lg-8 col-xl-9">
                        <div className="row g-4">
                            <div className="col-lg-6">
                                <div className="border rounded">
                                    <img src={productInfo.productImg} className="img-fluid rounded" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <h4 className="fw-bold mb-3">{productInfo.nameProduct}</h4>
                                <h5 className="fw-bold mb-3">{productInfo.price}K VNĐ/{productInfo.weight}</h5>
                                <div className="d-flex mb-4">
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <p className="mb-4"><b>Công dụng</b>: {productInfo.description}</p>
                                <p className="mb-4"><b>Cách sử dụng</b>: {productInfo.howUse}</p>
                                <p className="mb-4">Đã bán: <b>{productInfo.purchase}</b> sản phẩm</p>
                                <div className="input-group quantity mb-5" style={{ width: "100px" }}>
                                    <div className="input-group-btn">
                                        <button onClick={() => handleDecrement(quantity)} className="btn btn-sm btn-minus rounded-circle bg-light border" >
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input onChange={(e) => { handleQuantityChange(parseInt(e.target.value)) }} value={quantity} style={{ backgroundColor: 'transparent' }} type="text" className="form-control form-control-sm text-center border-0" min={1} disabled />
                                    <div className="input-group-btn">
                                        <button onClick={() => handleIncrement(quantity)} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <button onClick={handleToAddCart} className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Thêm vào giỏ hàng</button>
                            </div>
                            <div className="col-lg-12">
                                <div className="tab-content pt-3 mb-5">
                                    <h4>Đánh giá của khách hàng</h4>
                                    <div className='comment-render'>
                                        {isLoading ? (
                                            <Spin size="large" />
                                        ) : errors && Object.keys(errors).length > 0 ? (
                                            <Alert message="Error" description="Unable to load comments." type="error" />
                                        ) : (
                                            <div>
                                                {renderComments(filterCommentByProductId)}

                                                <Pagination
                                                    current={pagination.currentPage}
                                                    defaultPageSize={pagination.limitPerPage}
                                                    total={pagination.total}
                                                    onChange={handlePageChange}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* <form action="#">
                                <h4 className="mb-5 fw-bold">Để lại ý kiến của bạn</h4>
                                <div className="row g-4">
                                    <div className="col-lg-6">
                                        <div className="border-bottom rounded">
                                            <input type="text" className="form-control border-0 me-4" placeholder="Tên của bạn" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="border-bottom rounded">
                                            <input type="number" className="form-control border-0" placeholder="Số điện thoại" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="border-bottom rounded my-4">
                                            <textarea name="" id="" className="form-control border-0" cols="30" rows="8" placeholder="Đánh giá của bạn về sản phẩm của chúng tôi" spellCheck="false"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="d-flex justify-content-between py-3 mb-5">
                                            <div className="d-flex align-items-center">
                                                <p className="mb-0 me-3">Đánh giá:</p>
                                                <div className="d-flex align-items-center" style={{ fontSize: "12px" }}>
                                                    <i className="fa fa-star text-muted"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                            </div>
                                            <a href="/#" className="btn border border-secondary text-primary rounded-pill px-4 py-3"> Đăng bình luận</a>
                                        </div>
                                    </div>
                                </div>
                            </form> */}
                            <div className='form-comment-container'>
                                <Form
                                    form={form}
                                    name="feedback_form"
                                    onFinish={onFinish}
                                    layout="vertical"
                                    className="mb-4"
                                >
                                    <h4 className="mb-5 fw-bold">Để lại ý kiến của bạn</h4>

                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="fullName"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                                            >
                                                <Input placeholder="Họ tên của bạn" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="phoneNumber"
                                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' },
                                                { pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, message: 'Số điện thoại không hợp lệ!' }
                                                ]}
                                            >
                                                <Input type="tel" placeholder="Số điện thoại" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item
                                        name="comments"
                                        rules={[{ required: true, message: 'Vui lòng nhập đánh giá của bạn!' }]}
                                    >
                                        <Input.TextArea
                                            rows={8}
                                            placeholder="Đánh giá của bạn về sản phẩm của chúng tôi"
                                            spellCheck="false"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="rating"
                                        label="Đánh giá"
                                        rules={[{ required: true, message: 'Vui lòng chọn đánh giá!' }]}
                                    >
                                        <Rate />
                                    </Form.Item>

                                    <Form.Item style={{ display: "flex", justifyContent: "end" }}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="rounded-pill px-4 py-4 btn-style"
                                        >
                                            Đăng bình luận
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <div className="row g-4 fruite">
                            <div className="col-lg-12">
                                <form onSubmit={handleSubmitSearch} className="input-group w-100 mx-auto d-flex mb-4">
                                    <input type="search" className="form-control p-3" placeholder="Tìm kiếm" aria-describedby="search-icon-1" onChange={handleChangeInputSearch} />
                                    <button type='submit' style={{ border: "none", backgroundColor: "transparent" }}><span style={{ height: "58px", borderRadius: "0 10px 10px 0" }} id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span></button>
                                </form>
                                <div className="mb-4">
                                    <h4>Loại</h4>
                                    <ul style={{ listStyle: "none" }} className="list-unstyled fruite-categorie">
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <Link to={ROUTES.DRY_PAGE} className='button-style'><i className="fas fa-apple-alt me-2"></i>Sản phẩm dạng khô</Link>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <Link to={ROUTES.WET_PAGE} className='button-style'><i className="fas fa-apple-alt me-2"></i>Sản phẩm dạng tươi, lỏng hoặc tinh chất</Link>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <h4 className="mb-4">Sản phẩm nổi bật</h4>
                                <div className="d-flex align-items-center justify-content-start">
                                    <div className="rounded me-4" style={{ width: "100px", height: "100px" }}>
                                        <img style={{ width: "91px", height: "72px", objectFit: "cover" }} src="/img/nam-linhchi-kho-donggoi-1.jpg" className="img-fluid rounded" alt="" />
                                    </div>
                                    <div>
                                        <h6 className="mb-2">Nấm linh chi</h6>
                                        <div className="d-flex mb-2">
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fas fa-star-half-alt text-secondary"></i>
                                        </div>
                                        <div className="d-flex mb-2">
                                            <h5 className="fw-bold me-2">129k</h5>
                                            <h5 className="text-danger text-decoration-line-through">150k</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-start">
                                    <div className="rounded me-4" style={{ width: "100px", height: "100px" }}>
                                        <img style={{ width: "91px", height: "72px", objectFit: "cover" }} src="/img/mat-ong-3.jpg" className="img-fluid rounded" alt="" />
                                    </div>
                                    <div>
                                        <h6 className="mb-2">Mật ong rừng</h6>
                                        <div className="d-flex mb-2">
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fas fa-star-half-alt text-secondary"></i>
                                        </div>
                                        <div className="d-flex mb-2">
                                            <h5 className="fw-bold me-2">429k</h5>
                                            <h5 className="text-danger text-decoration-line-through">500k</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-start">
                                    <div className="rounded me-4" style={{ width: "100px", height: "100px" }}>
                                        <img style={{ width: "91px", height: "72px", objectFit: "cover" }} src="/img/nam-lim-xanh-kho-3.jpg" className="img-fluid rounded" alt="" />
                                    </div>
                                    <div>
                                        <h6 className="mb-2">Nấm lim xanh</h6>
                                        <div className="d-flex mb-2">
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fas fa-star-half-alt text-secondary"></i>
                                        </div>
                                        <div className="d-flex mb-2">
                                            <h5 className="fw-bold me-2">429k</h5>
                                            <h5 className="text-danger text-decoration-line-through">500k</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center my-4">
                                    <button onClick={handleSortBestSeller} className=" btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Xem thêm</button>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="position-relative">
                                    <img src="/img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt="" />
                                    <div className="position-absolute" style={{ top: "50%", right: "-60px", transform: "translate(-50%)" }}>
                                        <h3 className="text-secondary fw-bold">Natural <br /> Remedies <br /> Banner</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="fw-bold mb-0">Sản phẩm liên quan</h1>
                <div className="vesitable">
                    <div className="row g-4">

                        {renderRelatedProduct(relatedProductList)}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ShopDetail