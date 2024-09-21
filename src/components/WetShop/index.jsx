import React, { useEffect, useRef } from 'react';
import MainProduct from '../MainProduct';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchAllProduct } from '../../redux/features/product/productSlice';
import SpinnerComponent from '../SpinnerComponent';
import { useLocation } from 'react-router-dom';

const WetShop = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isLoading, products } = useSelector((state) => state.product);
    const activeTabWet = useRef('tab-11');

    useEffect(() => {
        dispatch(actFetchAllProduct());
    }, [dispatch]);

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (['tab-11', 'tab-12', 'tab-13', 'tab-14'].includes(hash)) {
            activeTabWet.current = hash;
            document.querySelectorAll(`#wet-shop .nav-pills .nav-item a`).forEach(anchor => {
                if (anchor.getAttribute('href') === `#${hash}`) {
                    anchor.classList.add('active');
                } else {
                    anchor.classList.remove('active');
                }
            });
            document.querySelectorAll(`#wet-shop .tab-content .tab-pane`).forEach(tabPane => {
                if (tabPane.id === hash) {
                    tabPane.classList.add('active');
                } else {
                    tabPane.classList.remove('active');
                }
            });
        } else {
            activeTabWet.current = 'tab-11';
        }
    }, [location.hash]);

    const filterAllWetProducts = products.filter(product => product.typeId === 2).sort((a, b) => b.purchase - a.purchase).slice(0, 8);
    const filterFreshProduct = products.filter(product => product.brandId === 4).sort((a, b) => b.purchase - a.purchase).slice(0, 8);
    const filterLiquidProduct = products.filter(product => product.brandId === 5).sort((a, b) => b.purchase - a.purchase).slice(0, 8);
    const filterExtractProduct = products.filter(product => product.brandId === 6).sort((a, b) => b.purchase - a.purchase).slice(0, 8);

    return (
        <div id="wet-shop" className="container-fluid fruite py-5">
            <div className="container py-5">
                <div className="tab-class text-center">
                    <div className="row g-4">
                        <div className="col-lg-4 text-start">
                            <h1>Sản phẩm dạng tươi, dạng tinh chất hoặc dạng lỏng</h1>
                        </div>
                        <div className="col-lg-8 text-end">
                            <ul style={{ listStyle: "none" }} className="nav nav-pills d-inline-flex text-center mb-5">
                                <li className="nav-item">
                                    <a
                                        className={`d-flex m-2 py-2 bg-light rounded-pill ${activeTabWet.current === 'tab-11' ? 'active' : ''}`}
                                        data-bs-toggle="pill"
                                        href="#tab-11"
                                    >
                                        <span className="text-dark" style={{ width: "130px" }}>Tất cả sản phẩm</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`d-flex py-2 m-2 bg-light rounded-pill ${activeTabWet.current === 'tab-12' ? 'active' : ''}`}
                                        data-bs-toggle="pill"
                                        href="#tab-12"
                                    >
                                        <span className="text-dark" style={{ width: "130px" }}>Dạng tươi</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`d-flex m-2 py-2 bg-light rounded-pill ${activeTabWet.current === 'tab-13' ? 'active' : ''}`}
                                        data-bs-toggle="pill"
                                        href="#tab-13"
                                    >
                                        <span className="text-dark" style={{ width: "130px" }}>Dạng lỏng</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`d-flex m-2 py-2 bg-light rounded-pill ${activeTabWet.current === 'tab-14' ? 'active' : ''}`}
                                        data-bs-toggle="pill"
                                        href="#tab-14"
                                    >
                                        <span className="text-dark" style={{ width: "130px" }}>Dạng tinh chất</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="tab-11" className={`tab-pane fade show p-0 ${activeTabWet.current === 'tab-11' ? 'active' : ''}`}>
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent /> : <div className="col-lg-12">
                                    <MainProduct products={filterAllWetProducts} />
                                </div>}
                            </div>
                        </div>
                        <div id="tab-12" className={`tab-pane fade show p-0 ${activeTabWet.current === 'tab-12' ? 'active' : ''}`}>
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent /> : <div className="col-lg-12">
                                    <MainProduct products={filterFreshProduct} />
                                </div>}
                            </div>
                        </div>
                        <div id="tab-13" className={`tab-pane fade show p-0 ${activeTabWet.current === 'tab-13' ? 'active' : ''}`}>
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent /> : <div className="col-lg-12">
                                    <MainProduct products={filterLiquidProduct} />
                                </div>}
                            </div>
                        </div>
                        <div id="tab-14" className={`tab-pane fade show p-0 ${activeTabWet.current === 'tab-14' ? 'active' : ''}`}>
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent /> : <div className="col-lg-12">
                                    <MainProduct products={filterExtractProduct} />
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WetShop;
