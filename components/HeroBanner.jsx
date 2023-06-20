import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';
import Wave from 'react-wavify'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'

const HeroBanner = ({ heroBanner }) => {
  const pagination = {
    clickable: true,
   
  };
  return (
    <Swiper pagination={pagination} spaceBetween={54}    slidesPerView={1}   modules={[Pagination]} className='hero-banner-container' //the slider that used to change the product
    >
  
     
      <Wave mask="url(#mask)" //the wave animation
      style={styles.wave}  fill="#f02d34"  
      options={{
        amplitude: 50,
        speed: 0.15,
        points: 4
      }}
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0" stopColor="white" />
            <stop offset="0.5" stopColor="black" />
          </linearGradient>
          <mask id="mask">
            <rect x="0" y="0" width="500" height="2500" fill="url(#gradient)"  />
          </mask>
        </defs>
      </Wave>


   {heroBanner.map((hero,index)=>{
        
        return(
          <SwiperSlide key={index} className='swiper-header'>
            <div> 
              <p className="beats-solo">{hero.smallText}</p>
              <h3>{hero.midText}</h3>
              <h1>{hero.largeText1}</h1>
              <img src={urlFor(hero.image)} alt="headphones" className="hero-banner-image" />

              <div>
                <Link href={`/product/${hero.product}`}>
                  <button type="button">{hero.buttonText}</button>
                </Link>
                <div className="desc">
                  <h5>Description</h5>
                  <p style={{marginLeft:60}}>{hero.desc}</p>
                </div>
              </div> 
            </div>
          </SwiperSlide>

        )
      })}
    </Swiper>
  )
}

export default HeroBanner
const styles={
  wave:{
    width: "500px",
    display: "inline-block",
    position: "absolute",
    overflow: "hidden",
    rotate: "90deg",
    top: "-20%",
    height: "700px",
    left: "7.5%",
    borderRadius: "15px",
    zIndex: -1
  }
}