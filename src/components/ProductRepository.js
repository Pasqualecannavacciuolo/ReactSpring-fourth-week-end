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
      const fetchData = async () => {
          const response = await axios.get('http://localhost:8080/api/v1/prodotto');
          setProducts(response.data);
      }
      //fetchData();
  }, [changed, products]);

  
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
        console.log("PRIMA")
        console.log(products);
        products.push(product);
        console.log("DOPO")
        console.log(products);
        setProducts(products);
        setChanged(true);
        console.log(changed)
        setChanged(false); 
      })
  }

  

  return(
      <div>
        <form  className='post-form' onSubmit={HandleSubmit}>
          <label className='row'>
            ID
            <input
              className='row-input'
              name="id"
              type="text"
              onChange={handleChangeId}
            />
          </label>
          <br />
          <label className='row'>
            Name
            <input
              className='row-input'
              name="name"
              type="text"
              onChange={handleChangeName}
            />
          </label>
          <br />
          <label className='row'>
          Quantity
            
            <input
              className='row-input'
              name="quantity"
              type="number"
              onChange={handleChangeQuantity}
            />
          </label>
          <input className='post-button' type="submit" value="Submit" />
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