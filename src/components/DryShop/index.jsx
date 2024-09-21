import React, { useEffect, useRef } from 'react';
import MainProduct from '../MainProduct';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchAllProduct } from '../../redux/features/product/productSlice';
import SpinnerComponent from '../SpinnerComponent';
import { useLocation } from 'react-router-dom';

const DryShop = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isLoading, products } = useSelector((state) => state.product);
    const activeTabDry = useRef('tab-1');

    useEffect(() => {
        dispatch(actFetchAllProduct());
    }, [dispatch]);

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (['tab-1', 'tab-2', 'tab-3', 'tab-4'].includes(hash)) {
            activeTabDry.current = hash;
            document.querySelectorAll(`#dry-shop .nav-pills .nav-item a`).forEach(anchor => {
                if (anchor.getAttribute('href') === `#${hash}`) {
                    anchor.classList.add('active');
                } else {
                    anchor.classList.remove('active');
                }
            });
            document.querySelectorAll(`#dry-shop .tab-content .tab-pane`).forEach(tabPane => {
                if (tabPane.id === hash) {
                    tabPane.classList.add('active');
                } else {
                    tabPane.classList.remove('active');
                }
            });
        } else {
            activeTabDry.current = 'tab-1';
        }
    }, [location.hash]);

    const filterAllDryProducts = products.filter(product => product.typeId === 1).sort((a, b) => b.purchase - a.purchase).slice(0, 8);
    const filterDryProduct = products.filter(product => product.brandId === 1).sort((a, b) => b.purchase - a.purchase).slice(0, 8);
    const filterPowderProduct = products.filter(product => product.brandId === 2).sort((a, b) => b.purchase - a.purchase).slice(0, 8);
    const filterTabletProduct = products.filter(product => product.brandId === 3).sort((a, b) => b.purchase - a.purchase).slice(0, 8);

    return (
        <div id="dry-shop" className="container-fluid fruite py-5">
            <div className="container py-5">
                <div className="tab-class text-center">
                    <div className="row g-4">
                        <div className="col-lg-4 text-start">
                            <h1>Sản phẩm dạng khô</h1>
                        </div>
                        <div className="col-lg-8 text-end">
                            <ul style={{ listStyle: "none" }} className="nav nav-pills d-inline-flex text-center mb-5">
                                <li className="nav-item">
                                    <a
                                        className={`d-flex m-2 py-2 bg-light rounded-pill ${activeTabDry.current === 'tab-1' ? 'active' : ''}`}
                                        data-bs-toggle="pill"
                                        href="#tab-1"
                                    >
                                        <span className="text-dark" style={{ width: "130px" }}>Tất cả sản phẩm</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`d-flex py-2 m-2 bg-light rounded-pill ${activeTabDry.current === 'tab-2' ? 'active' : ''}`}
                                        data-bs-toggle="pill"
                                        href="#tab-2"
                                    >
                                        <span className="text-dark" style={{ width: "130px" }}>Thảo dược khô</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`d-flex m-2 py-2 bg-light rounded-pill ${activeTabDry.current === 'tab-3' ? 'active' : ''}`}
                                        data-bs-toggle="pill"
                                        href="#tab-3"
                                    >
                                        <span className="text-dark" style={{ width: "130px" }}>Dạng bột</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`d-flex m-2 py-2 bg-light rounded-pill ${activeTabDry.current === 'tab-4' ? 'active' : ''}`}
                                        data-bs-toggle="pill"
                                        href="#tab-4"
                                    >
                                        <span className="text-dark" style={{ width: "130px" }}>Dạng viên</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="tab-1" className={`tab-pane fade show p-0 ${activeTabDry.current === 'tab-1' ? 'active' : ''}`}>
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent /> : <div className="col-lg-12">
                                    <MainProduct products={filterAllDryProducts} />
                                </div>}
                            </div>
                        </div>
                        <div id="tab-2" className={`tab-pane fade show p-0 ${activeTabDry.current === 'tab-2' ? 'active' : ''}`}>
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent /> : <div className="col-lg-12">
                                    <MainProduct products={filterDryProduct} />
                                </div>}
                            </div>
                        </div>
                        <div id="tab-3" className={`tab-pane fade show p-0 ${activeTabDry.current === 'tab-3' ? 'active' : ''}`}>
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent /> : <div className="col-lg-12">
                                    <MainProduct products={filterPowderProduct} />
                                </div>}
                            </div>
                        </div>
                        <div id="tab-4" className={`tab-pane fade show p-0 ${activeTabDry.current === 'tab-4' ? 'active' : ''}`}>
                            <div className="row g-4">
                                {isLoading ? <SpinnerComponent /> : <div className="col-lg-12">
                                    <MainProduct products={filterTabletProduct} />
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DryShop;
