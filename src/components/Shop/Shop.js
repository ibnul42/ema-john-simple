import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product'

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [product, setProduct] = useState(first10);
    const handleAddProduct = (product) => {
        console.log(product);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    product.map(product => <Product 
                                        handleAddProduct = {handleAddProduct}
                                        product={product}
                                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <h3>This is cart</h3>
            </div>
        </div>
    );
};

export default Shop;