import React from 'react'
import Product from '../Product'

const MainProduct = (props) => {

    const renderProduct = (_product) => {
        return _product.map((product) => {
            return <Product key={product.id} product={product} />;
        });
    }
    return (
        <div className="row g-4">
            {renderProduct(props.products)}
        </div>
    )
}

export default MainProduct