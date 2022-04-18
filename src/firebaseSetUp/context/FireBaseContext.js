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
import { async } from "@firebase/util";

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
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
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
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(url);
      }
    );
  }

  async function getImages() {
    const usersRef = ref(storage, 'images');
    const firstPage = await list(usersRef, { maxResults: 100 });

    if (firstPage)
      firstPage.prefixes.forEach(async (uid) => {
        const newUsersRef = ref(storage, uid.fullPath);
        const image = await list(newUsersRef, { maxResults: 100 });

        let imageList = [];
        for (let i = 0; i < image.items.length; i++) {
          console.log(image.items[i]._location.path);
          
          // const dRef = ref(storage, image.items[i]._location.path.toString());
        }
        

      });
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
