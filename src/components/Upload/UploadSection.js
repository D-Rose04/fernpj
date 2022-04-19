import { useState } from 'react';
import { Container } from 'react-bootstrap';
import './uploadSection.css';
import { useFireContext } from '../../firebaseSetUp/context/FireBaseContext';

export default function Upload() {
  const [img, setImg] = useState();
  const { uploadImage } = useFireContext();

  const handleInput = (event) => {
    const selected = event.target.files[0];
    setImg(selected);
    const src = URL.createObjectURL(selected);
    console.log(src);
    document.getElementById("img").style.backgroundImage = 'url(' + src + ')';
  };

  const handleSubmit = () => {
    uploadImage(img);
  };

  return (
    <Container className='uploadContainer'>
      <form onSubmit={(e) => e.preventDefault()}>
        <div id='img' className='imgPlaceHolder rounded'>
          
        </div>
        <input src={img} className='inputControl' id="imgUploaded" onChange={(e) => handleInput(e)} type='file' ></input>
        <button className='btn btn-outline-success' onClick={() => handleSubmit()}  >Submit</button>
      </form>0
    </Container>
  )
}
