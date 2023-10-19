import React, { useEffect, useState } from 'react';

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
   const[products,setProducts] =useState([]);

   function fetchProducts(){
    
    fetch("http://localhost:3001/products")
  .then ((response) => {
    if(!response.ok){
      throw new Error ("Unexpected Server Error");
    }
    return response.json()
  })
  .then((data) => {
    // console.log(data)
    setProducts(data);
  })
  .catch((error) => console.log("err",error));
   }

useEffect(()=>fetchProducts(),[]);


  return (
    <>
      <h1 className='text-center mb-3'>List of Auctions</h1>
      <button onClick={()=>props.showForm()} type="button" className='btn btn-primary m-2'>Create</button>
   <table className='table'>
<thead>
  <tr>
    <th>Product</th>
    <th>Seller</th>
    <th>Top Bid</th>
    <th>Time Remaining</th>
  </tr>
</thead>
<tbody>
  {

    products.map((product,index)=>{
      return(
        <tr key={index}>
          <td>{product.prodctname}</td>
           <td>{product.seller}</td>
            <td>${product.topbid }</td>
             <td>{product. timeremaning}</td>
          
          <td style={{ width: '10px', whiteSpace: 'nowrap' }}>


            <button type='button' className='btn btn-primary btn-sm  me-2'>Bid</button>
            <button type="button" className='btn btn-danger btn-sm'>Delete</button>
          </td>
        </tr>
      )
    })
  }
</tbody>
   </table>
   
    </>
  );
}

function ProductForm(props) {
  return (
    <>
      <h1 className='text-center mb-3'>Create a new Auction</h1>
      <button onClick={()=>props.showList()} type="button" className='btn btn-secondary m-2'>Cancel</button>
    </>
  );
}
