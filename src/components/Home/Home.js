import { useEffect, useState } from "react";
import { useFireContext } from "../../firebaseSetUp/context/FireBaseContext";
import './home.css'

export default function Home() {
  // const [images, setImages] = useState([]);
  const { getImages, images } = useFireContext();

  useEffect(() => {
    getImages();
  },[]);

  return (
    <div className="gallery">
      {console.log(images)}
    </div>
  )
}






