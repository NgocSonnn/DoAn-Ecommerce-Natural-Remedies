import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllProduct } from '../../redux/features/product/productSlice'
import SpinnerComponent from '../SpinnerComponent'
import { actAddProductToCarts } from '../../redux/features/cart/cartSlice'
import { generatePath, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import './style.scss'


const BestSellerProduct = () => {
    const { isLoading, products } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(actFetchAllProduct())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const renderBestSellerProduct = (_product) => {
        return _product.map((product) => {
            const handleClickToProductDetail = () => {
                const productId = product.id
                navigate(generatePath(ROUTES.SHOP_DETAIL_PAGE, { productId }))
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
            return <div key={product.id} className="col-lg-6 col-xl-4">
                <div style={{ height: "231px", alignItems: "center", display: "flex" }} className="p-4 rounded bg-light">
                    <div className="row align-items-center">
                        <div style={{ textAlign: "center" }} className="col-6">
                            <img style={{ objectFit: "cover", width: "142px", height: "142px" }} src={product.productImg} className="img-fluid rounded-circle" alt="" />
                            <p style={{ marginTop: "28px" }}>đã bán: <b>{product.purchase} </b>sp</p>
                        </div>
                        <div className="col-6">
                            <button onClick={handleClickToProductDetail} className="h5 btn-style">{product.nameProduct}</button>
                            <div className="d-flex my-3">
                                <i className="fas fa-star text-primary"></i>
                                <i className="fas fa-star text-primary"></i>
                                <i className="fas fa-star text-primary"></i>
                                <i className="fas fa-star text-primary"></i>
                                <i className="fas fa-star-half-alt text-primary"></i>
                            </div>
                            <h4 className="mb-3">{product.price}K/{product.weight}</h4>
                            <button onClick={handleToAddCart} className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i>Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                </div>
            </div>;
        });
    }

    const filterBestSellerProduct = products.filter(product => product).sort((a, b) => b.purchase - a.purchase).slice(0, 6);
    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="text-center mx-auto mb-5" style={{ maxWidth: "700px" }}>
                    <h1 className="display-4">Sản phẩm bán chạy nhất</h1>
                    <p>🌿 "Tận hưởng sức khỏe tối ưu với sản phẩm bán chạy nhất của chúng tôi <br></br> thiên nhiên là liệu pháp tốt nhất!" 💚</p>
                </div>
                {isLoading ? <SpinnerComponent></SpinnerComponent> : <div className="row g-4">
                    {renderBestSellerProduct(filterBestSellerProduct)}
                </div>}
            </div>
        </div>
    )
}

export default BestSellerProduct