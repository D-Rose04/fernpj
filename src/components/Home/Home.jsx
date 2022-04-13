  import { useState } from "react";

export default function Home() {
  // const [images, setImages] = useState([]);
  const images = ['https://picsum.photos/200/300?random=2',
  'https://picsum.photos/200/300?random=1',
  'https://picsum.photos/200/300?random=3',
  'https://picsum.photos/200/300?random=4']
  return (
    <div className="gallery">
      {images.map(image => <img src={image}></img>)}
    </div>
  )
}






