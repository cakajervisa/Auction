import React, { useState } from 'react';

const Products = () => {
  
  const [content,setContent] =useState(<ProductList showForm={showForm}/>);
  
  function showList () {
    setContent(<ProductList  showForm={showForm}/>);
  }
   function showForm () {
    setContent(<ProductForm showList={showList}/>);
  }
  
  return (
    <div className='container my-5 text-center '>
      <>
        {content}
      </>
    </div>
  );
}

export default Products;

function ProductList(props) {
  return (
    <React.Fragment>
      <h1 className='text-center mb-3'>List of Auctions</h1>
      <button onClick={()=>props.showForm()} type="button" className='btn btn-primary m-2'>Create</button>
    </React.Fragment>
  );
}

function ProductForm(props) {
  return (
    <React.Fragment>
      <h1 className='text-center mb-3'>Create a new Auction</h1>
      <button onClick={()=>props.showList()} type="button" className='btn btn-secondary m-2'>Cancel</button>
    </React.Fragment>
  );
}
