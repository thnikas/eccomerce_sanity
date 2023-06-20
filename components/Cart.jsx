import React, { useRef, useState,useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const [initial,setInitial]=useState('100%')
  const [animation,setAnimation]=useState(0)//the animation when the cart is clicked
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove,radioIndex,showCart } = useStateContext();//values from usecontext file
  const handleCheckout = async () => {//when pay with stripe in pressed
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }
  const show={
    x:0
  }
  const hide = ()=>{
    setAnimation('100%'), setInitial(0)
  };
  
  return (
    <motion.div className="cart-wrapper" ref={cartRef}   initial={{x:initial}}  transition={{ //tha animation of the cart the initial changes in depence of which animation should execute
      duration: 0.08,
      delay: 0.08,
      ease: [0, 0.71, 0.2, 1.01]
    }}
    animate={{x:animation}} onTransitionEnd={()=>initial==0?setShowCart(false):null}>
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => hide()}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[radioIndex])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>{item.price}€</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" >{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Cart