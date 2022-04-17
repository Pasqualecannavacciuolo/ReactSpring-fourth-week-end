import React, {useState, useEffect} from 'react'
import axios from 'axios' 

export const ProductRepository= () => {
  const [products, setProducts] = useState([]);

  const [changed, setChanged] = useState(false);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  
  

  /* GET */
  React.useEffect( () => {
      fetch('http://localhost:8080/api/v1/prodotto')
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setProducts(data)
      })
      .catch(error => {
        console.error("Errore durante il FETCH")
      })  
  }, []);

  
  /* POST */
  const handleChangeId = event => {
    setId(event.target.value);
  }
  const handleChangeName = event => {
    setName(event.target.value);
  }
  const handleChangeQuantity = event => {
    setQuantity(event.target.value);
  }

  const HandleSubmit = event => {
    event.preventDefault();

    const product = {
      id : id,
      name: name,
      quantity: quantity
    };

    axios.post(`http://localhost:8080/api/v1/prodotto`, { id: product.id, name: product.name, quantity: product.quantity })
      .then(() => {
        
        products.push(product);
        
        setProducts(products);
        
        setChanged(true); 
      })
      setChanged(false)
  }

  

  return(
      <div>
        <form  className='post-form' onSubmit={HandleSubmit}>
        <div className='form-child'>
          <h2 className='form-title'>Inserisci un nuovo prodotto</h2>
        </div>
          <div className='form-child'>
            <label className='form-label'>ID</label>
              <input
                className='form-input'
                name="id"
                type="text"
                onChange={handleChangeId}
              />
          </div>
          <div className='form-child'>
            <label className='form-label'>Name</label>
            <input
                className='form-input'
                name="name"
                type="text"
                onChange={handleChangeName}
              />
          </div>
          <div className='form-child'>
            <label className='form-label'>Quantity</label>
              <input
                className='form-input'
                name="quantity"
                type="number"
                onChange={handleChangeQuantity}
              />
          </div>
          <div className='form-child'>
            <input className='post-button' type="submit" value="Submit" />
          </div>
        </form>
          {products.length > 0 && products.map(product =>
              <div key={product.id} className="father">
                  <div className='child'>ID: {product.id}</div>
                  <div className='child'>Name: {product.name}</div>
                  <div className='child'>Quantity: {product.quantity}</div>
              </div>
          )}
      </div>
  );
}

  /* DELETE */
  export class Delete extends React.Component{
    
    constructor(){
        super();
        this.id=React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
            const path = "http://localhost:8080/api/v1/prodotto/";
            const id1 = this.id.current.value;
            axios.delete(path +id1);
            console.log(path);
    }

    render(){

    return(<div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Id
                    <input type="text" name="nome" ref={this.id}/>
                </label>
                    <input type="submit" value="Cancella" />
            </form>
        </div>
    )
    }

}