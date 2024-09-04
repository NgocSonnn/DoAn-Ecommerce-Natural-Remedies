import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllProduct, setSearchKey } from '../../redux/features/product/productSlice'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const HeroComponent = () => {
    const { pagination, searchKey, params, filters } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChangeInputSearch = (event) => {
        const value = event.target.value
        dispatch(setSearchKey(value))
    }
    const handleSubmitSearch = (event) => {
        event.preventDefault();
        dispatch(actFetchAllProduct({
            _page: 1,
            _limit: pagination.limitPerPage,
            q: searchKey,
            ...params,
            ...filters
        }))
        navigate(ROUTES.SHOP_PAGE)
    }


    return (
        <div className="container-fluid py-5 mb-5 hero-header">
            <div className="container py-5">
                <div className="row g-5 align-items-center">
                    <div className="col-md-12 col-lg-7">
                        <h3 className="mb-3 text-secondary">"Giải pháp tự nhiên để cải thiện sức khỏe"</h3>
                        <h1 className="mb-5 display-3 text-primary">Natural Remedies có đầy đủ dược liệu từ thiên nhiên</h1>
                        <div className="position-relative mx-auto">
                            <input onChange={handleChangeInputSearch} className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill" type="search" placeholder="Tìm kiếm" />
                            <button onClick={handleSubmitSearch} type="submit" className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100" style={{ top: 0, right: "25%" }}>Tìm kiếm</button>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-5">
                        <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                            <div className="carousel-inner" role="listbox">
                                <div className="carousel-item active rounded">
                                    <img src="/img/nam-linhchi-kho-donggoi-1.jpg" className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" />
                                    <a href="/#" className="btn px-4 py-2 text-white rounded">Dạng khô</a>
                                </div>
                                <div className="carousel-item rounded">
                                    <img src="/img/nam-linhchi-tuoi-3.jpg" className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                    <a href="/#" className="btn px-4 py-2 text-white rounded">Dạng tươi</a>
                                </div>
                                <div className="carousel-item rounded">
                                    <img src="/img/mat-ong-1.jpg" className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                    <a href="/#" className="btn px-4 py-2 text-white rounded">Dạng tinh chất</a>
                                </div>
                                <div className="carousel-item rounded">
                                    <img src="/img/ruou-ngam-sam-bo-chinh-1.jpg" className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                    <a href="/#" className="btn px-4 py-2 text-white rounded">Dạng lỏng</a>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HeroComponent