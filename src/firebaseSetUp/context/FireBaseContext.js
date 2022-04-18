import React, { useContext, useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL, list } from 'firebase/storage';
import { auth, storage } from "../config/config-firebase";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';


const FireBaseContext = React.createContext();

export function useFireContext() {
  return useContext(FireBaseContext);
}

export function FireBaseProvider({ children }) {
  const provider = new GoogleAuthProvider();
  const [currUser, setCurrUser] = useState();
  const [logged, setLogged] = useState(false);
  const [images, setImages] = useState([]);

  function SignUp(email, pwd) {
    return createUserWithEmailAndPassword(auth, email, pwd);
  }

  function SignIn(email, pwd) {
    return signInWithEmailAndPassword(auth, email, pwd);
  }

  function SignInWithGoogle() {
    return signInWithPopup(auth, provider);
  }

  function updateUserName(userName) {
    updateProfile(auth.currentUser, { displayName: userName });
  }

  function SignOut() {
    signOut(auth);
  }

  function uploadImage(file) {
    const filename = file.name;
    const storageRef = ref(storage, `images/${currUser.uid}/${filename}`);
    return uploadTask = uploadBytesResumable(storageRef, file);
  }

  async function getImages() {
    const usersRef = ref(storage, 'images');
    const firstPage = await list(usersRef, { maxResults: 100 });

    if (firstPage)
      firstPage.prefixes.forEach(async (uid) => {
        const newUsersRef = ref(storage, uid.fullPath);
        const image = await list(newUsersRef, { maxResults: 100 });
        
        // gets url for all the images from every user
        let urls = [];
        image.items.forEach(async (item) => {
          const url = await getDownloadURL(item);
          setImages([...images,url]); 
        });
      });
    console.log(images);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrUser(user);
    })

    return unsubscribe;
  }, []);

  const value = {
    currUser,
    SignUp,
    SignIn,
    SignInWithGoogle,
    updateUserName,
    logged,
    setLogged,
    SignOut,
    uploadImage,
    getImages,
    images
  };

  return (
    <FireBaseContext.Provider value={value}>
      {children}
    </FireBaseContext.Provider>
  )
}
