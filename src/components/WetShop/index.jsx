import React, { useEffect } from 'react'
import MainProduct from '../MainProduct'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllProduct } from '../../redux/features/product/productSlice'
import SpinnerComponent from '../SpinnerComponent'

const WetShop = () => {
    const dispatch = useDispatch()
    const { isLoading, products } = useSelector((state) => state.product)

    useEffect(() => {
        dispatch(actFetchAllProduct())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const filterAllWetProducts = products.filter(product => product.typeId === 2).sort((a, b) => b.purchase - a.purchase).slice(0, 8);
    const filterFreshProduct = products.filter(product => product.brandId === 4).sort((a, b) => b.purchase - a.purchase).slice(0, 8)
    const filterLiquidProduct = products.filter(product => product.brandId === 5).sort((a, b) => b.purchase - a.purchase).slice(0, 8)
    const filterExtractProduct = products.filter(product => product.brandId === 6).sort((a, b) => b.purchase - a.purchase).slice(0, 8)

    return (
        <div className="container-fluid fruite py-5">
            <div className="container py-5">
                <div className="tab-class text-center">
                    <div className="row g-4">
                        <div className="col-lg-4 text-start">
                            <h1>Sản phẩm dạng tươi, dạng tinh chất hoặc dạng lỏng</h1>
                        </div>
                        <div className="col-lg-8 text-end">
                            <ul style={{ listStyle: "none" }} className="nav nav-pills d-inline-flex text-center mb-5">
                                <li className="nav-item">
                                    <a className="d-flex m-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-11">
                                        <span className="text-dark" style={{ width: "130px" }}>Tất cả sản phẩm </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-12">
                                        <span className="text-dark" style={{ width: "130px" }}>Dạng tươi</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-13">
                                        <span className="text-dark" style={{ width: "130px" }}>Dạng lỏng</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-14">
                                        <span className="text-dark" style={{ width: "130px" }}>Dạng tinh chất</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="tab-11" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent></SpinnerComponent> : <div className="col-lg-12">
                                    <MainProduct products={filterAllWetProducts} />
                                </div>}
                            </div>
                        </div>
                        <div id="tab-12" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent></SpinnerComponent> : <div className="col-lg-12">
                                    <MainProduct products={filterFreshProduct} />
                                </div>}
                            </div>
                        </div>
                        <div id="tab-13" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent></SpinnerComponent> : <div className="col-lg-12">
                                    <MainProduct products={filterLiquidProduct} />
                                </div>}
                            </div>
                        </div>
                        <div id="tab-14" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent></SpinnerComponent> : <div className="col-lg-12">
                                    <MainProduct products={filterExtractProduct} />
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WetShop