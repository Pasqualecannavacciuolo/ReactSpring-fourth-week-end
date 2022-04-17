import './ShipmentsRepository.css'
import React, {useState, useEffect, createRef, useRef} from 'react'
import axios from 'axios' 

export const ShipmentsRepository= () => {

  // State for GET
  const [shipments, setShipments] = useState([]);

  // State for POST
  const [id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [cap, setCap] = useState('');

  const [changed, setChanged] = useState(false);


  let [idDel, setIdDel] = useState('');
  

  /* GET */
  React.useEffect( () => {
      fetch('http://localhost:8080/api/v1/consegna')
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setShipments(data)
      })
      .catch(error => {
        console.error("Errore durante il FETCH")
      })  
  }, []);

  
  /* POST */
  const handleChangeId = event => {
    setId(event.target.value);
  }
  const handleChangeAddress = event => {
    setAddress(event.target.value);
  }
  const handleChangeCap = event => {
    setCap(event.target.value);
  }
  

  const HandleSubmit = event => {
    event.preventDefault();

    const shipment = {
      id : id,
      address: address,
      cap: cap
    };

    axios.post(`http://localhost:8080/api/v1/consegna`, { id: shipment.id, address: shipment.address, CAP: shipment.cap })
      .then(() => {
        shipments.push(shipment);
        setShipments(shipments);
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
    axios.delete("http://localhost:8080/api/v1/consegna/"+id1).then(() => {
      for(let i=0; i<shipments.length; i++) {
        if(shipments[i].id === id1) {
          shipments.splice(i, 1);
        }
      }
      setChanged(true);
    });
    setChanged(false);
  }


  return(
      <div>
        <form className='shipments-post-form' onSubmit={HandleSubmit}>
        <div className='form-child'>
          <h2 className='form-title'>Inserisci una nuova consegna</h2>
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
            <label className='form-label'>Address</label>
            <input
                placeholder='Insert Address...'
                className='form-input'
                name="address"
                type="text"
                onChange={handleChangeAddress}
              />
          </div>
          <div className='form-child'>
            <label className='form-label'>CAP</label>
            <input
                placeholder='Insert CAP...'
                className='form-input'
                name="cap"
                type="text"
                onChange={handleChangeCap}
              />
          </div>
          <div className='form-child'>
            <input className='shipments-post-button' type="submit" value="Submit" />
          </div>
        </form>
        
        <form className='shipments-form-delete' onSubmit={handleDeleteSubmit}>
          <div className='delete-child'>
            <h2 className='form-title'>Cancella una consegna</h2>
          </div>
          <div className='delete-child'>
            <label className='delete-label'>ID</label>
            <input placeholder='ID da cancellare...' className='delete-input' type="text" name="nome" onChange={handleChangeIdDel}  ref={useRef(idDel)}/>
          </div>
          <div className='delete-child'>
            <input className='shipments-post-button' type="submit" value="Cancella" />
          </div>
        </form>

          {shipments.length > 0 && shipments.map(shipment =>
              <div key={shipment.id} className="father-shipments">
                  <div className='shipments-child'>ID: {shipment.id}</div>
                  <div className='shipments-child'>Indirizzo: {shipment.address}</div>
                  <div className='shipments-child'>Cap: {shipment.cap}</div>
              </div>
          )}
      </div>
  );
}