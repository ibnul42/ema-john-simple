import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const ReviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px'
    };
    return (
        <div style={ReviewItemStyle} className="review-item">
            <h3 className="product-name">{name}</h3>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <button 
            onClick={() => props.removeProduct(key)}
            className="main-button"
            >Remove</button>
        </div>
    );
};

export default ReviewItem;