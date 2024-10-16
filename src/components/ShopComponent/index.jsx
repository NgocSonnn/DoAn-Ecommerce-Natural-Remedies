import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllProduct, setNewPage, setSearchKey, setSortNameProduct, setSortPriceProduct, setSearchParams as actSetSearchParams, actClearFilter } from '../../redux/features/product/productSlice'
import { message, Modal, Pagination, Radio, Select } from 'antd'
import './style.scss'
import SpinnerComponent from '../SpinnerComponent'
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { actAddProductToCarts } from '../../redux/features/cart/cartSlice'
import { HeartFilled } from '@ant-design/icons'
import { actAddWishList, actDeleteWishListById, actFetchAllWishLists, actFetchAllWishListsByUserId } from '../../redux/features/wishList/wishListSlice'

const ShopComponent = () => {
    const { isLoading, products, pagination, searchKey, params } = useSelector((state) => state.product)
    const isLogin = useSelector(state => state.user.isLogin)
    const userInfo = useSelector(state => state.user.userInfo)
    const wishLists = useSelector(state => state.wishLists.wishLists)
    const dispatch = useDispatch()
    const naviage = useNavigate()
    const [inputSearchKey, setInputSearchKey] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const isComponentFirstMount = useRef(true);

    useEffect(() => {
        if (userInfo) {
            dispatch(actFetchAllWishListsByUserId({ userId: userInfo.id }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]);

    const optionName = [
        { value: '1', label: "Tên: A -> Z" },
        { value: '2', label: "Tên: Z -> A" },
        { value: '3', label: "Giá: Thấp -> Cao" },
        { value: '4', label: "Giá: Cao -> Thấp" },
    ]
    const optionPrice = [
        { value: '0', label: "0K -> 600K" },
        { value: '1', label: "0K -> 99K" },
        { value: '2', label: "100K -> 199K" },
        { value: '3', label: "200K -> 299K" },
        { value: '4', label: "300K -> 399K" },
        { value: '5', label: "400K -> 499K" },
        { value: '6', label: "500K -> 599K" },
    ]

    useEffect(() => {
        if (isComponentFirstMount.current) {
            return;
        }
        const currentPage = Number(searchParams.get('_page')) || 1;
        const q = searchParams.get('q') || searchKey;
        dispatch(actFetchAllProduct({
            _page: currentPage,
            _limit: pagination.limitPerPage,
            q: q,
            ...params
        }))
        dispatch(setNewPage(currentPage))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, pagination.currentPage, searchKey]);

    useEffect(() => {
        const currentPage = Number(searchParams.get('_page')) || 1;
        const typeId = Number(searchParams.get('typeId')) || null;
        const brandId = Number(searchParams.get('brandId')) || null;
        const _sort = (searchParams.get("_sort")) || null
        const _order = (searchParams.get("_order")) || null
        const price_lte = Number(searchParams.get("price_lte")) || null
        const price_gte = Number(searchParams.get("price_gte")) || null
        dispatch(setSortNameProduct(params.sortedName))
        dispatch(setSortPriceProduct(params.sortedPrice))
        dispatch(setNewPage(currentPage))

        const _params = {
            ...params,
            typeId: typeId,
            brandId: brandId,
            _sort: _sort,
            _order: _order,
            price_lte: price_lte,
            price_gte: price_gte,
        }
        dispatch(actSetSearchParams(_params))

        isComponentFirstMount.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.sortedName, params.sortedPrice])

    const handleChangePage = (newPage) => {
        dispatch(setNewPage(newPage));
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("_page", newPage);
            return newParams;
        });
        dispatch(actFetchAllProduct({
            _page: newPage,
            _limit: pagination.limitPerPage,
            q: searchKey,
            ...params,
        }))
    }

    const handleChangeInputSearch = (event) => {
        const value = event.target.value
        setInputSearchKey(value)
    }

    const handleSubmitSearch = (event) => {
        event.preventDefault()
        dispatch(setSearchKey(inputSearchKey))
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("_page", 1);
            newParams.set("q", inputSearchKey);
            return newParams;
        });
        const currentPage = Number(searchParams.get('_page')) || 1;
        dispatch(setNewPage(currentPage))
    }

    const handleSortBestSeller = () => {
        naviage(ROUTES.BESTSELLER_PAGE)
    }

    const handleSortChangeName = (value) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("_page", 1);
            switch (value) {
                case '1':
                    newParams.set("_sort", "nameProduct")
                    newParams.set("_order", "asc")
                    break;
                case '2':
                    newParams.set("_sort", "nameProduct")
                    newParams.set("_order", "desc")
                    break;
                case '3':
                    newParams.set("_sort", "price")
                    newParams.set("_order", "asc")
                    break;
                case '4':
                    newParams.set("_sort", "price")
                    newParams.set("_order", "desc")
                    break;

                default:
                    newParams.set("_sort", null)
                    newParams.set("_order", null)
                    break;
            }
            return newParams;
        });
        dispatch(actSetSearchParams({
            ...params,
            sortedName: value
        }));
        dispatch(setNewPage(1))
    }

    const handleSortChangePrice = (value) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("_page", 1);
            switch (value) {
                case '0':
                    newParams.set("_sort", "id")
                    newParams.set("_order", "asc")
                    newParams.set("price_gte", 0);
                    newParams.set("price_lte", 600);
                    break;
                case '1':
                    newParams.set("_sort", "price")
                    newParams.set("_order", "asc")
                    newParams.set("price_gte", 0);
                    newParams.set("price_lte", 99);
                    break;
                case '2':
                    newParams.set("_sort", "price")
                    newParams.set("_order", "asc")
                    newParams.set("price_gte", 100);
                    newParams.set("price_lte", 199);
                    break;
                case '3':
                    newParams.set("_sort", "price")
                    newParams.set("_order", "asc")
                    newParams.set("price_gte", 200);
                    newParams.set("price_lte", 299);
                    break;
                case '4':
                    newParams.set("_sort", "price")
                    newParams.set("_order", "asc")
                    newParams.set("price_gte", 300);
                    newParams.set("price_lte", 399);
                    break;
                case '5':
                    newParams.set("_sort", "price")
                    newParams.set("_order", "asc")
                    newParams.set("price_gte", 400);
                    newParams.set("price_lte", 499);
                    break;
                case '6':
                    newParams.set("_sort", "price")
                    newParams.set("_order", "asc")
                    newParams.set("price_gte", 500);
                    newParams.set("price_lte", 599);
                    break;
                default:
                    newParams.set("_sort", null)
                    newParams.set("_order", null)
                    newParams.set("price_gte", null);
                    newParams.set("price_lte", null);
                    break;
            }
            return newParams;
        });
        dispatch(actSetSearchParams({
            ...params,
            sortedPrice: value
        }));
        dispatch(setNewPage(1))
    }

    const handleSortDryandWetProduct = (event) => {
        const typeId = Number(event.target.value);
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("_page", 1);
            newParams.set("typeId", typeId);
            return newParams;
        });
        dispatch(actSetSearchParams({
            ...params,
            typeId
        }))
        dispatch(setNewPage(1));
    };

    const handleRadioChange = (event) => {
        const brandId = Number(event.target.value);
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("brandId", brandId);
            newParams.set("_page", 1);
            return newParams;
        });
        dispatch(actSetSearchParams({
            ...params,
            brandId
        }))
        dispatch(setNewPage(1));

    };

    const handleClear = (event) => {
        event.preventDefault()
        dispatch(actClearFilter())
        setSearchParams({});
        setInputSearchKey('')
    }


    const renderShopProduct = (_product) => {

        return _product.map((product) => {
            const handleClickToProductDetail = () => {
                const productId = product.id
                naviage(generatePath(ROUTES.SHOP_DETAIL_PAGE, { productId }))
            }
            const existedItem = wishLists.find(
                (item) => item.userId === userInfo.id && item.wishList.productId === product.id
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
                    id: product.id,
                    productImg: product.productImg,
                    weight: product.weight,
                    price: product.price,
                    nameProduct: product.nameProduct,
                    quantity: 1,
                }
                dispatch(actAddProductToCarts(productToAdd))

            }
            return <div key={product.id} className="col-md-6 col-lg-6 col-xl-4">
                <div style={{ height: "541px", display: "flex", flexDirection: "column", justifyContent: "space-between" }} className="rounded position-relative border border-secondary fruite-item ">
                    <div className="fruite-img">
                        <img style={{ height: "300px", objectFit: "cover" }} src={product.productImg} className="img-fluid w-100 rounded-top" alt="" />
                    </div>
                    <div onClick={handleToAddWishList} className={`wishList-style text-white bg-secondary px-3 py-1 rounded position-absolute ${existedItem ? "style-wishList-true" : "style-wishList-false"}`} style={{ top: "10px", left: "10px", cursor: "pointer" }}><HeartFilled className='wishList-style-icon' /></div>
                    <div style={{ textAlign: "center" }} className="p-4 border-top-0 rounded-bottom">
                        <h4 onClick={handleClickToProductDetail} className='product-name-style'>{product.nameProduct}</h4>
                        <p>{product.description}</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                            <p style={{ width: "100%", textAlign: "center" }} className="text-dark fs-5 fw-bold mb-0">{product.price}K/{product.weight}</p>
                            <button onClick={handleToAddCart} style={{ width: "100%" }} href="/#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i>Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        });
    }

    return (
        <div className="container-fluid fruite py-5">
            <div className="container py-5">
                <h1 className="mb-4">Natural Remedies Shop</h1>
                <div className="row g-4">
                    <div className="col-lg-12">
                        <div className="row g-4">
                            <div className="col-xl-3">
                                <form onSubmit={handleSubmitSearch} className="input-group w-100 mx-auto d-flex">
                                    <input type="search" className="form-control p-3" placeholder="Tìm kiếm..." aria-describedby="search-icon-1" value={inputSearchKey}
                                        onChange={handleChangeInputSearch} />
                                    <button type='submit' style={{ border: "none", backgroundColor: "transparent" }}><span style={{ height: "58px", borderRadius: "0 10px 10px 0" }} id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span></button>
                                </form>
                            </div>
                            <div className="col-6"></div>
                            <div className="col-xl-3">
                                <div style={{ alignItems: "center" }} className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                    <label htmlFor="fruits">Lọc:</label>
                                    <Select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3"
                                        value={params.sortedName || "Tên: A -> Z"}
                                        onChange={handleSortChangeName}
                                    >
                                        {optionName.map(option => (
                                            <Select.Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="row g-4">
                            <div className="col-lg-3">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div style={{ paddingBottom: "12px", display: "flex", justifyContent: "center" }} className="col-lg-12" >
                                            <button className='btn border border-secondary rounded-pill px-3 text-primary' onClick={handleClear}>Bỏ tất cả lọc</button>
                                        </div>
                                        <div className="mb-3">
                                            <h4>Loại</h4>
                                            <ul style={{ listStyle: "none" }} className="list-unstyled fruite-categorie">
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <button onClick={handleSortDryandWetProduct} value={1}
                                                            className={`button-style ${params.typeId === 1 ? 'selected-typeId' : ''}`}
                                                        ><i className=" fas fa-apple-alt me-2"></i>Sản phẩm dạng khô</button>
                                                        <span >(43)</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <button onClick={handleSortDryandWetProduct} value={2}
                                                            className={`button-style ${params.typeId === 2 ? 'selected-typeId' : ''}`}
                                                        ><i className=" fas fa-apple-alt me-2"></i>Sản phẩm dạng tươi, lỏng hoặc tinh chất</button>
                                                        <span style={{ display: "flex", alignItems: "center" }}>(20)</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <h4 htmlFor="price" className="mb-2">Khoảng giá:</h4>
                                            <Select id="fruits" name="fruitlist" className="border-0 form-select-sm me-3"
                                                value={params.sortedPrice || "0K -> 600K"}
                                                onChange={handleSortChangePrice}
                                            >
                                                {optionPrice.map(option => (
                                                    <Select.Option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                            {/* <input type="range" className="form-range w-100" id="rangeInput" name="rangeInput" min="0" max="500"
                                                value={rangeValue} onChange={handleInputChangeRanger} />
                                            <output id="amount" name="amount" htmlFor="rangeInput">{rangeValue}K VNĐ</output> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <Radio.Group className="mb-3" value={params.brandId || null} onChange={handleRadioChange}>
                                            <h4>Chi tiết:</h4>
                                            <div className="mb-2">
                                                <Radio value={1} className="me-2">Thảo dược khô</Radio>
                                            </div>
                                            <div className="mb-2">
                                                <Radio value={2} className="me-2"> Dạng bột</Radio>
                                            </div>
                                            <div className="mb-2">
                                                <Radio value={3} className="me-2"> Dạng viên</Radio>
                                            </div>
                                            <div className="mb-2">
                                                <Radio value={4} className="me-2"> Dạng tươi</Radio>
                                            </div>
                                            <div className="mb-2">
                                                <Radio value={5} className="me-2"> Dạng lỏng</Radio>
                                            </div>
                                            <div className="mb-2">
                                                <Radio value={6} className="me-2"> Dạng tinh chất</Radio>
                                            </div>
                                        </Radio.Group>
                                    </div>
                                    <div className="col-lg-12">
                                        <h4 className="mb-3">Sản phẩm nổi bật:</h4>
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
                                            <button type='submit' onClick={handleSortBestSeller} className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Xem thêm</button>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="position-relative">
                                            <img src="/img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt="" />
                                            <div className="position-absolute" style={{ top: "50%", right: 0, transform: "translateY(-50%)" }}>
                                                <h3 className="text-secondary fw-bold">Natural  <br /> Remedies <br /> Banner</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                {isLoading ? <SpinnerComponent></SpinnerComponent> : <div className="row g-4 justify-content-start">
                                    {renderShopProduct(products)}
                                    <Pagination style={{ marginTop: 10, justifyContent: "end" }}
                                        defaultPageSize={pagination.limitPerPage}
                                        current={pagination.currentPage}
                                        total={pagination.total}
                                        onChange={handleChangePage}></Pagination>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ShopComponent