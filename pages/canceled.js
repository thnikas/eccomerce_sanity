"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsFillBagXFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities,cartItems } = useStateContext();
  
 console.log(cartItems)

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon-x">
          <BsFillBagXFill />
        </p>
        <h2>You cancel your order!</h2>
      
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Return to Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success