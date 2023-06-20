import React from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';

import { urlFor } from '../lib/client';
const Product = ({ product: { image, name, slug, price } }) => {
  const { radioIndex,setRadioIndex } = useStateContext()
  return (
    <div>
      <Link onClick={()=>setRadioIndex(0)} href={`/product/${slug.current}`}>
        <div className="product-card">
          <img 
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">{price}€</p>
          
        </div>
       
      </Link>
    </div>
  )
}

export default Product