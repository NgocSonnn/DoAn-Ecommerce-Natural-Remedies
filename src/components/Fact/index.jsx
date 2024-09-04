import React from 'react'

const Fact = () => {
    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="bg-light p-5 rounded">
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="counter bg-white rounded p-5">
                                <i className="fa fa-users text-secondary"></i>
                                <h4 style={{ minHeight: "115px" }}>Khách hàng hài lòng</h4>
                                <h1>19637</h1>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="counter bg-white rounded p-5">
                                <i className="fa fa-users text-secondary"></i>
                                <h4 style={{ minHeight: "115px" }}>Chất lượng dịch vụ</h4>
                                <h1>99%</h1>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="counter bg-white rounded p-5">
                                <i className="fa fa-users text-secondary"></i>
                                <h4 style={{ minHeight: "115px" }}>Chứng nhận chất lượng</h4>
                                <h1>27</h1>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="counter bg-white rounded p-5">
                                <i className="fa fa-users text-secondary"></i>
                                <h4 style={{ minHeight: "115px" }}>Sản phẩm có sẵn</h4>
                                <h1>77</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fact