import React, { useEffect, useState } from 'react';

const Products = () => {
  const [content,setContent] =useState(<ProductList showForm={showForm}/>);
  function showList () {
    setContent(<ProductList  showForm={showForm}/>);
  }
   function showForm (product) {
    setContent(<ProductForm  product={product} showList={showList}/>);
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
//Delete a product 
 function deleteProduct(productId) {
    fetch(`http://localhost:3001/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
  
        fetchProducts();
      })
      .catch((error) => console.log("Error deleting product:", error));
  }
// Fetch products from the server
   function fetchProducts(){
  fetch("http://localhost:3001/products")
  .then ((response) => {
    if(!response.ok){
      throw new Error ("Failed to fetch products");
    }
    return response.json()
  })
  .then((data) => {
  // console.log(data)
    setProducts(data);
  })
  .catch((error) => console.log("Error fetching products:",error));
   }
useEffect(()=>fetchProducts(),[]);
  return (
    <>
      <h1 className='text-center mb-3'>List of Auctions</h1>
      <button onClick={()=>props.showForm({})} type="button" className='btn btn-primary m-2'>Create</button>
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
          <td>{product.productname}</td>
           <td>{product.seller}</td>
            <td>${product.topbid }</td>
             <td>{product. timeremaining}</td>
          <td style={{ width: '10px', whiteSpace: 'nowrap' }}>
            <button  onClick={()=> props.showForm(product)}  type='button' className='btn btn-primary btn-sm  me-2'>Bid</button>
            <button  onClick={() => deleteProduct(product.id)} type="button" className='btn btn-danger btn-sm'>Delete</button>
          </td> 
           </tr> 
            ) })}
</tbody> </table>  </>);}
function ProductForm(props) {
const [errorMessage,setErrorMessage]=useState("");
// Handle form submission
  function  handleSubmit(event){
    event.preventDefault();
    const formData =new FormData(event.target);
    const product =Object.fromEntries(formData.entries());
//Form validtion
if(!product.productname ||!product.seller ||!product.topbid ||!product.timeremaining ||!product.description )
{
  setErrorMessage(
 <div className='alert alert-warning' role="alert">
  "Please provide all the required fields!"
</div>)
return;
}
 if (product.productname.length <= 3) {
      setErrorMessage(
        <div className="alert alert-warning" role="alert">
          Product name must be greater than 3 characters in length!
        </div>
      );
      return;
    }
      if (product.description.length <= 10) {
      setErrorMessage(
        <div className="alert alert-warning" role="alert">
          Description must be greater than 10 characters in length!
        </div>
      );
      return;
    }
      if (isNaN(product.topbid)) {
    setErrorMessage(
      <div className='alert alert-warning' role="alert">
        "Top bid must be a number!"
      </div>
    );return;}
//Create a new product
product.createdAt=new Date().toISOString().slice(0,10);
fetch("http://localhost:3001/products",
{
  method:"POST",
  headers:{
    "Content-Type":"application/json",},
 body: JSON.stringify(product)
})
  .then ((response) => {
    if (!response.ok){
      throw new Error("Network response was not OK")  }
    return response.json()
  })
  .then((data)=>props.showList())
  .catch((error)=>{console.log("Error",error);});}
  return (
    <>
      <h1 className='text-center mb-3'>Create a new Auction</h1>
   <div className='col-lg-6 mx-auto'>
<form onSubmit={(event)=>handleSubmit(event)}>
   {errorMessage} 
  <div className='row mb-3'>
    <label className=' col-sm-4  col-form-label '>Product Name</label>
<div className=' col-sm-8'>
  <input className='form-control' name="productname" defaultValue={props.product.productname} />
</div>
  </div>

<div className='row mb-3'>
  <label className=' col-sm-4  col-form-label '>ID</label>
<div className=' col-sm-8'>
<input readOnly className='form-control-plaintext' name="id" defaultValue={props.product.id} />
</div>
</div> 

   <div className='row mb-3'>
    <label className=' col-sm-4  col-form-label '>Seller</label>
<div className=' col-sm-8'>
  <input className='form-control' name="seller" defaultValue={props.product.seller}/>
</div>
  </div>
   <div className='row mb-3'>
    <label className=' col-sm-4  col-form-label '>Staring Bid</label>
<div className=' col-sm-8'>
  <input className='form-control' name="topbid" defaultValue={props.product.topbid}/>
</div>
  </div>
    <div className='row mb-3'>
    <label className=' col-sm-4  col-form-label '>Time Remaining</label>
<div className=' col-sm-8'>
  <input className='form-control' name="timeremaining" defaultValue={props.product.timeremaining}/>
</div>
  </div> 
    <div className='row mb-3'>
    <label className=' col-sm-4  col-form-label '>Description</label>
<div className=' col-sm-8'>
  <textarea className='form-control'
   name="description" defaultValue={props.product.description}/>
</div>
  </div>
<div className='row'>
<div className='offset-sm-4 col-sm-4 d-grid'>
  <button type='submit' className='btn btn-primary 
   btn-sm me-3'>Save</button>
  </div>
<div className='col-sm-4 d-grid'>
   <button onClick={()=>props.showList()} type="button" className='btn btn-secondary me-2'> Cancel</button></div></div></form> </div></>);}
