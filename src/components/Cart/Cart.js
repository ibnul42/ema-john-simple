import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for(let i=0; i<cart.length; i++) {
        const prod = cart[i];
        total += prod.price * prod.quantity;
    }

    let shipping = 0;
    for(let i=0; i<cart.length; i++) {
        const prod = cart[i];
        shipping += prod.shipping;
    }

    let tax = total/10;
    Math.round(shipping);
    tax = tax.toFixed(2)
    Math.round(shipping);


    return (
        <div>
            <h4>Order Suummary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Total: {total}</p>
            <p>Shhipping Cost: {shipping}</p>
            <p>Vat + Tax: {tax}</p>
            <p>Total Price: {(total + shipping + parseFloat(tax))}</p> <br/>
            <Link to="/review"><button className="main-button">Review Order</button></Link>
        </div>
    );
};

export default Cart;