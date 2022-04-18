import { useEffect } from "react";
import { useFireContext } from "../../firebaseSetUp/context/FireBaseContext";
import './home.css'

export default function Home() {
  const { getImages, images } = useFireContext();

  useEffect(() => {
    getImages();
  },[]);

  return (
    <div className="gallery">
      {images.map((img)=> <img src={img}></img>)}
    </div>
  )
}






