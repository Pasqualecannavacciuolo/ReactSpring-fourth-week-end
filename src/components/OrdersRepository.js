import './OrdersRepository.css'
import React, {useState, useEffect, createRef, useRef} from 'react'
import axios from 'axios' 

export const OrderRepository= () => {

  // State for GET
  const [orders, setOrder] = useState([]);

  // State for POST
  const [id, setId] = useState('');
  const [client, setClient] = useState('');

  const [changed, setChanged] = useState(false);


  let [idDel, setIdDel] = useState('');
  

  /* GET */
  React.useEffect( () => {
      fetch('http://localhost:8080/api/v1/ordine')
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setOrder(data)
      })
      .catch(error => {
        console.error("Errore durante il FETCH")
      })  
  }, []);

  
  /* POST */
  const handleChangeId = event => {
    setId(event.target.value);
  }
  const handleChangeClient = event => {
    setClient(event.target.value);
  }
  

  const HandleSubmit = event => {
    event.preventDefault();

    const order = {
      id : id,
      clientRef: client,
    };

    axios.post(`http://localhost:8080/api/v1/ordine`, { id: order.id, clientRef: order.client })
      .then(() => {
        orders.push(order);
        setOrder(orders);
        setChanged(true); 
      })
      setChanged(false)
  }// Fine handleSubmit for POST



  /* DELETE */
  const handleChangeIdDel = event => {
    setIdDel(event.target.value);
    idDel = React.createRef();
  }

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    const id1 = idDel;
    console.log(id1);
    axios.delete("http://localhost:8080/api/v1/ordine/"+id1).then(() => {
      for(let i=0; i<orders.length; i++) {
        if(orders[i].id === id1) {
          orders.splice(i, 1);
        }
      }
      setChanged(true);
    });
    setChanged(false);
  }


  return(
      <div>
        <form className='post-form' onSubmit={HandleSubmit}>
        <div className='form-child'>
          <h2 className='form-title'>Inserisci un nuovo Ordine</h2>
        </div>
          <div className='form-child'>
            <label className='form-label'>ID</label>
              <input
                placeholder='Insert ID...'
                className='form-input'
                name="id"
                type="text"
                onChange={handleChangeId}
              />
          </div>
          <div className='form-child'>
            <label className='form-label'>Client Reference</label>
            <input
                placeholder='Insert Client Reference...'
                className='form-input'
                name="client"
                type="text"
                onChange={handleChangeClient}
              />
          </div>
          <div className='form-child'>
            <input className='order-post-button' type="submit" value="Submit" />
          </div>
        </form>

        <form className='orders-form-delete' onSubmit={handleDeleteSubmit}>
          <div className='delete-child'>
            <h2 className='form-title'>Cancella un'ordine</h2>
          </div>
          <div className='delete-child'>
            <label className='delete-label'>ID</label>
            <input placeholder='ID da cancellare...' className='delete-input' type="text" name="nome" onChange={handleChangeIdDel}  ref={useRef(idDel)}/>
          </div>
          <div className='delete-child'>
            <input className='order-post-button' type="submit" value="Cancella" />
          </div>
        </form>
          {orders.length > 0 && orders.map(order =>
              <div key={order.id} className="father-orders">
                  <div className='orders-child'>ID: {order.id}</div>
                  <div className='orders-child'>clientRef: {order.clientRef}</div>
              </div>
          )}
      </div>
  );
}