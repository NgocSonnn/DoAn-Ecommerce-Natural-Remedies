import React, { useRef } from 'react'
import { actFetchAllProduct, setSearchKey } from '../../redux/features/product/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'


const ModalSearch = () => {
    const { pagination, searchKey, params, filters } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const btnCloseRef = useRef(null)

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
        navigate(ROUTES.SHOP_PAGE);
        btnCloseRef.current.click()
    }

    return (
        <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content rounded-0">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                        <button ref={btnCloseRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex align-items-center">
                        <div className="input-group w-75 mx-auto d-flex">
                            <input onChange={handleChangeInputSearch} type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                            <button onClick={handleSubmitSearch} type='submit' id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalSearch