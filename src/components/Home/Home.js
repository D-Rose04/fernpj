import { useEffect, useState } from 'react';
import './home.css'
import ImageList from "./ImageList";
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebaseSetUp/config/config-firebase';

export default function Home() {
  const imagesCol = collection(db, 'images');
  const [urls,setUrls] = useState();
  let images = [];
  const getImages = async () => {

    const querySnapshot = await getDocs(imagesCol);
    querySnapshot.forEach((doc) => {
      images.push(doc.data().url);
    });
    setUrls(images);
  }

  useEffect(() => { 
    getImages();
  },[]);

  return (
    <div className="gallery">
      <ImageList images={urls} />
    </div>
  )
}






