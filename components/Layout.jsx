import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';
import icon from '../public/favicon.ico'
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Beat Shop</title>
        {/* <link rel="icon" type="image/svg+xml" href='../public/favicon.ico'/> */}
        <link rel="icon" type="image/x-icon" href=".../public/favicon.ico" />

      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout