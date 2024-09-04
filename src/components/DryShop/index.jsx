import React, { useEffect } from 'react'
import MainProduct from '../MainProduct'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllProduct } from '../../redux/features/product/productSlice'
import SpinnerComponent from '../SpinnerComponent'

const DryShop = () => {
    const dispatch = useDispatch()
    const { isLoading, products } = useSelector((state) => state.product)
    useEffect(() => {
        dispatch(actFetchAllProduct())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const filterAllDryProducts = products.filter(product => product.typeId === 1).sort((a, b) => b.purchase - a.purchase).slice(0, 8);
    const filterDryProduct = products.filter(product => product.brandId === 1).sort((a, b) => b.purchase - a.purchase).slice(0, 8);
    const filterPowderProduct = products.filter(product => product.brandId === 2).sort((a, b) => b.purchase - a.purchase).slice(0, 8);
    const filterTabletProduct = products.filter(product => product.brandId === 3).sort((a, b) => b.purchase - a.purchase).slice(0, 8);

    return (
        <div className="container-fluid fruite py-5">
            <div className="container py-5">
                <div className="tab-class text-center">
                    <div className="row g-4">
                        <div className="col-lg-4 text-start">
                            <h1>Sản phẩm dạng khô</h1>
                        </div>
                        <div className="col-lg-8 text-end">
                            <ul style={{ listStyle: "none" }} className="nav nav-pills d-inline-flex text-center mb-5">
                                <li className="nav-item">
                                    <a className="d-flex m-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-1">
                                        <span className="text-dark" style={{ width: "130px" }}>Tất cả sản phẩm </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                                        <span className="text-dark" style={{ width: "130px" }}>Thảo dược khô</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-3">
                                        <span className="text-dark" style={{ width: "130px" }}>Dạng bột</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-4">
                                        <span className="text-dark" style={{ width: "130px" }}>Dạng viên</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent></SpinnerComponent> : <div className="col-lg-12">
                                    <MainProduct products={filterAllDryProducts} />
                                </div>}
                            </div>
                        </div>
                        <div id="tab-2" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent></SpinnerComponent> : <div className="col-lg-12">
                                    <MainProduct products={filterDryProduct} />
                                </div>}
                            </div>
                        </div>
                        <div id="tab-3" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent></SpinnerComponent> : <div className="col-lg-12">
                                    <MainProduct products={filterPowderProduct} />
                                </div>}
                            </div>
                        </div>
                        <div id="tab-4" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent></SpinnerComponent> : <div className="col-lg-12">
                                    <MainProduct products={filterTabletProduct} />
                                </div>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DryShop