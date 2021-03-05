import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart)
    let total = 0;
    for(let i=0; i<cart.length; i++) {
        const prod = cart[i];
        total += prod.price;
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
            <p>Total Price: {(total + shipping + parseFloat(tax))}</p>
        </div>
    );
};

export default Cart;