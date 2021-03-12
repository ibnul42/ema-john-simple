import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity} = props.product;
    const ReviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px'
    };
    return (
        <div style={ReviewItemStyle} className="review-item">
            <h3 className="product-name">{name}</h3>
            <p>Quantity: {quantity}</p>
            <button className="main-button">Review</button>
        </div>
    );
};

export default ReviewItem;