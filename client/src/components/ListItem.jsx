import React from 'react';

const ListItem = (props) => (
  <div>
  <h1> {props.item.product_name} </h1>
  </div>
)

export default ListItem;


const update = (_id) => {
  axios.put('/api/items', {product_name, description_name, price, img})
  .then((res)=>{console.log(res),
  setReload(!reload)})
  .catch((err)=>console.log(err)) 
  }

  const remove = (_id) => {
    axios.delete(`/api/items/${_id}`)
  .then((res)=>{console.log(res),
    setReload(!reload)})
  .catch((err)=>console.log(err)) 
  }
   
  