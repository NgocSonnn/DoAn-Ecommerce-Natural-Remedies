import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchProductById, setBestSellProduct, setFilterProduct, setSearchKey } from '../../redux/features/product/productSlice'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import './style.scss'
import { actAddProductToCarts } from '../../redux/features/cart/cartSlice'
const ShopDetail = () => {
    // const { nameProduct, price, description, weight, howUse, productImg, purchase, id } = productInfo
    const { products, productInfo } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

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
    const handleSortDryandWetProduct = (event) => {
        const typeId = Number(event.target.value);
        dispatch(setFilterProduct({ typeId }))
        if (typeId === 1) {
            products.filter(products => products.typeId === 1)
        } else if (typeId === 2) {
            products.filter(products => products.typeId === 2)
        }
        navigate(ROUTES.SHOP_PAGE)

    };
    const handleToAddCart = () => {
        const productToAdd = {
            id: productInfo.id,
            productImg: productInfo.productImg,
            weight: productInfo.weight,
            price: productInfo.price,
            nameProduct: productInfo.nameProduct,
            quantity: 1,
        }
        dispatch(actAddProductToCarts(productToAdd))
    }
    useEffect(() => {
        dispatch(actFetchProductById(params.productId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const relatedProductList = products.filter(products => products.brandId === productInfo.brandId && products.id !== productInfo.id).sort((a, b) => b.purchase - a.purchase).slice(0, 4)

    const renderRelatedProduct = (relatedProduct) => {
        return relatedProduct.map((product) => {
            const handleClickToProductDetail = () => {
                const productId = product.id
                navigate(generatePath(ROUTES.SHOP_DETAIL_PAGE, { productId }))
                window.location.reload();
            }
            const handleToAddCart = () => {
                const productToAdd = {
                    id: product.id,
                    productImg: product.productImg,
                    weight: product.weight,
                    price: product.price,
                    nameProduct: product.nameProduct,
                    quantity: 1,
                }
                dispatch(actAddProductToCarts(productToAdd))

            }
            return <div key={product.id} className="col-md-6 col-lg-4 col-xl-3 ">
                <div style={{ height: "541px", display: "flex", flexDirection: "column", justifyContent: "space-between" }} className='border border-primary rounded position-relative  vesitable-item' >
                    <div className="vesitable-img">
                        <img style={{ height: "320px", objectFit: "cover" }} src={product.productImg} className="img-fluid w-100 rounded-top" alt="" />
                    </div>
                    <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: "10px", right: "10px" }}></div>
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
                                        <button className="btn btn-sm btn-minus rounded-circle bg-light border" >
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" className="form-control form-control-sm text-center border-0" placeholder="1" />
                                    <div className="input-group-btn">
                                        <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <button onClick={handleToAddCart} className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Thêm vào giỏ hàng</button>
                            </div>
                            <div className="col-lg-12">
                                <div className="tab-content mb-5">
                                    <h5>Đánh giá của khách hàng</h5>
                                    <div >
                                        <div className="d-flex p-3">
                                            <img src="/img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: "100px", height: "100px" }} alt="" />
                                            <div className="">
                                                <p className="mb-2" style={{ fontSize: "14px" }}>April 12, 2024</p>
                                                <div className="d-flex justify-content-between">
                                                    <h5>Nguyễn Ngọc C</h5>
                                                    <div className="d-flex mb-3">
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star-half-alt text-secondary"></i>
                                                    </div>
                                                </div>
                                                <p>"Tôi rất hài lòng với dịch vụ và sản phẩm của Natural Remedies. Sản phẩm của họ luôn tươi mới và an toàn cho sức khỏe." 🌼💚</p>
                                            </div>
                                        </div>
                                        <div className="d-flex p-3">
                                            <img src="/img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: "100px", height: "100px" }} alt="" />
                                            <div className="">
                                                <p className="mb-2" style={{ fontSize: "14px" }}>April 12, 2024</p>
                                                <div className="d-flex justify-content-between">
                                                    <h5>Hoàng Thị D</h5>
                                                    <div className="d-flex mb-3">
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star-half-alt text-secondary"></i>

                                                    </div>
                                                </div>
                                                <p className="text-dark">"Tôi đã sử dụng sản phẩm của Natural Remedies và thấy sự cải thiện rõ rệt trong sức khỏe của mình. Chất lượng vượt trội và đáng để mua." 🌱💪 </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <form action="#">
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
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <div className="row g-4 fruite">
                            <div className="col-lg-12">
                                <div className="input-group w-100 mx-auto d-flex mb-4">
                                    <input type="search" className="form-control p-3" placeholder="Tìm kiếm" aria-describedby="search-icon-1" onChange={handleChangeInputSearch} />
                                    <button type='submit' onClick={handleSubmitSearch} style={{ border: "none", backgroundColor: "transparent" }}><span style={{ height: "58px", borderRadius: "0 10px 10px 0" }} id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span></button>
                                </div>
                                <div className="mb-4">
                                    <h4>Loại</h4>
                                    <ul style={{ listStyle: "none" }} className="list-unstyled fruite-categorie">
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <button onClick={handleSortDryandWetProduct} value={1} className='button-style'><i className="fas fa-apple-alt me-2"></i>Sản phẩm dạng khô</button>
                                                <span>(43)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <button onClick={handleSortDryandWetProduct} value={2} className='button-style'><i className="fas fa-apple-alt me-2"></i>Sản phẩm dạng tươi, lỏng hoặc tinh chất</button>
                                                <span style={{ display: "flex", alignItems: "center" }}>(20)</span>
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