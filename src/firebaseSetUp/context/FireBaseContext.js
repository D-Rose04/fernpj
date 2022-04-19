import React, { useContext, useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL, list } from 'firebase/storage';
import { auth, db, storage } from "../config/config-firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
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
  const imagesCol = collection(db, 'images');
  let urls = [];

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
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log("Uknown error");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            alert(error.code);
            break;
          case 'storage/canceled':
            alert(error.code);
            break;
          default:
            alert("Uknown error");
            break;
        }
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(url);
        await addDoc(imagesCol, { uploadedBy: auth.currentUser.uid, url: url });
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrUser(user);
    })
    return unsubscribe,urls;
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
    urls
  };

  return (
    <FireBaseContext.Provider value={value}>
      {children}
    </FireBaseContext.Provider>
  )
}
