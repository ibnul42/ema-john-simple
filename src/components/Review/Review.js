import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaceed, setOrderPlaced] = useState(false);
    const history = useHistory();
    let thankyou;

    const handleProceedCheckout = () => {
        history.push('/shipment')
    };

    if(orderPlaceed){
        thankyou = `Thank you for your Order...
                    Happy Shopping !!!
                    `;
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

    useEffect(() => {
        //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map(key => {
        const product = fakeData.find(pd => pd.key === key);
        product.quantity = savedCart[key];
        return product;
    });
    setCart(cartProducts);
    }, []);

    return (
        <div className="twin-container">  
            <div className="product-container">          
            {
                <h2 style={{color:"green", textAlign:"center"}}>{thankyou}</h2>
            }
            {
                cart.map(pd => <ReviewItem 
                    product={pd}
                    key={pd.key}
                    removeProduct = {removeProduct}
                    ></ReviewItem>)
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>            
                    <button className="main-button" onClick={handleProceedCheckout}>Proceed Checkout</button>               
                </Cart>
            </div>
        </div>
    );
};

export default Review;