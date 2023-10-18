import React, { useState } from 'react';

const Products = () => {
  // const[content,setContent] =useState(<ProductList/>);
  return (
    <div className='container my-5 text-center '>
      <>
        <ProductList />
        <ProductForm />
      </>
    </div>
  );
}

export default Products;

function ProductList() {
  
  return (
    <React.Fragment>
      <h1 className='text-center mb-3'>List of Auctions</h1>
      <button type="button" className='btn btn-primary m-2'>Create</button>
    </React.Fragment>
  );
}

function ProductForm() {
  return (
    <React.Fragment>
      <h1 className='text-center mb-3'>Create a new Auction</h1>
      <button type="button" className='btn btn-secondary m-2'>Cancel</button>
    </React.Fragment>
  );
}
