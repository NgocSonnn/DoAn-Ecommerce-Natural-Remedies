import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const SinglePageHeader = (props) => {

  return (
    <div style={{ marginTop: "175px !important" }} className="container-fluid page-header py-5">
      <h1 className="text-center text-white display-6">{props.title}</h1>
      <ol className="breadcrumb justify-content-center mb-0">
        <li className="breadcrumb-item"><Link to={ROUTES.HOME_PAGE}>Trang chủ</Link></li>
        <li className="breadcrumb-item"><Link to={ROUTES.DRY_PAGE}>Sản phẩm khô</Link></li>
        <li className="breadcrumb-item"><Link to={ROUTES.WET_PAGE}>Sản phẩm tươi</Link></li>
        <li className="breadcrumb-item"><Link to={ROUTES.BESTSELLER_PAGE}>Sản phẩm bán chạy</Link></li>
        <li className="breadcrumb-item active text-white">{props.title}</li>
      </ol>
    </div>
  )
}

export default SinglePageHeader