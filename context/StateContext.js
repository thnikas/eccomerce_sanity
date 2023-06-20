'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [radioIndex,setRadioIndex]=useState(0)
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {//when the plus icon is pressed
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {//change the array of the products and increase quantity
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
      setQty(1)
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
      setQty(1)
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  } 

  const onRemove = (product) => {//when the minus icon is pressed
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {//which function will be used
    
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)
    const updatedCartItems = [...cartItems]; // Create a copy of the cartItems array

    if(value === 'inc') {
      
      
      if (index >= 0 && index < updatedCartItems.length) {
        const itemToUpdate = updatedCartItems[index];
        const updatedItem = { ...itemToUpdate, quantity: itemToUpdate.quantity + 1 };
        updatedCartItems[index] = updatedItem;}
      
        setCartItems(updatedCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        if (index >= 0 && index < updatedCartItems.length) {
          const itemToUpdate = updatedCartItems[index];
          const updatedItem = { ...itemToUpdate, quantity: itemToUpdate.quantity - 1 };
          updatedCartItems[index] = updatedItem;}
          
          setCartItems(updatedCartItems);
          setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider //export the context values
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities ,
        radioIndex,
        setRadioIndex
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);