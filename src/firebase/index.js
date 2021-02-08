import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB42ytSgBsjpXI8vH9VXtay7rKwtO7UgqM",
  authDomain: "upload-images-5d7b8.firebaseapp.com",
  projectId: "upload-images-5d7b8",
  storageBucket: "upload-images-5d7b8.appspot.com",
  messagingSenderId: "838581124358",
  appId: "1:838581124358:web:dfa5ca97cbf9d96d437287",
  measurementId: "G-C8JKLBR00M",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
