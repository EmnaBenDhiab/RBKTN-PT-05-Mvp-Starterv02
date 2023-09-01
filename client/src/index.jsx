import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import List from './components/List.jsx'
import axios from "axios"

const App = () => {
  const [items, setItems] = useState([])
  const [img, SetImg] = useState('');
  const [product_name, setProduct_Name] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [reload, setReload] = useState(false);

 
  useEffect(() => {
      axios.get('/api/items')
       .then((res) => {
        console.log("response.data" , res.data);
        setItems(res.data);
      })
      .catch ((err) => { console.error(err); })
      }, [reload])
      
    const handleAddItem = () => {
      axios.post('/api/items', {product_name, description, price, img})
      .then((res) => setReload(!reload))
      .catch((err) =>  console.error(err))
    }

    const uploadImage = () => {
      const data = new FormData();
      data.append('file', img);
      data.append('upload_preset', 'emnanew22');
      data.append('cloud_name', 'dronych6x');

      fetch('https://api.cloudinary.com/v1_1/dronych6x/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          SetImg(data.secure_url);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
    return ( 

      <div>
        <input type="file" name="file" onChange={(e) => SetImg(e.target.files[0])} />
<button onClick={uploadImage}>Upload</button>

        <input
        id='new'
        onChange={(e) => setProduct_Name(e.target.value)}
        type="text"
        name="product_name"
        placeholder="product_name"
        required
        />
        
        
    
      <input
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        name="description"
        placeholder="description"
        required
        />

        <input
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        name="price"
        placeholder="price"
        required
        />

<input type="text" value={img} name="image" readOnly required />

        <button onClick={handleAddItem}>Add Item</button>
        <div>
          <List items={items} setReload={setReload} reload={reload} />
        </div>
      </div>
      )
    }

ReactDOM.render(<App />, document.getElementById('app'))


