import { Button } from 'bootstrap';
import { useRef, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import './uploadSection.css';
import { useFireContext } from '../../firebaseSetUp/context/FireBaseContext';

export default function Upload() {
  const [img, setImg] = useState();
  const { uploadImage } = useFireContext();

  const handleInput = (event) => {
    const selected = event.target.files[0];
    setImg(selected);
    
  };

  const handleSubmit = () => {
    uploadImage(img);
  };

  return (
    <Container className='uploadContainer'>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='imgPlaceHolder rounded'>
          <img id='img'></img>
        </div>
        <input src={img} className='inputControl' id="imgUploaded" onChange={(e) => handleInput(e)} type='file' ></input>
        <button className='btn btn-outline-success' onClick={() => handleSubmit()}  >Submit</button>
      </form>0
    </Container>
  )
}
