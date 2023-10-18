import React from 'react';
import Navbar from './navbar'; 
import Footer from './footer'; 
import Home from './home';
import { BrowserRouter, Route , Routes } from 'react-router-dom';
import Products from './products';

const Layout = () => {
  return (
    <>
    <BrowserRouter>
     <Navbar /> 
     <Routes>
   <Route path='/'element={<Home/>}/>     
   <Route path='/products'element={<Products/>}/>    
     </Routes>
      <Footer />
    
    </BrowserRouter>
     


        {/* <Home/>
     <Auctions/> */}
    </>
  );
};

export default Layout;
