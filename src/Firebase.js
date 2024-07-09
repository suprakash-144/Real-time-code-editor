import { initializeApp } from "firebase/app";

import toast from "react-hot-toast";
import { createContext, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [logedin, setislogedin] = useState(false);
  const [user, setuser] = useState(null);
  const signupUser = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Registration Successful");
        authchange();
      })
      .catch((err) => {
        toast.error("Singup Failed!");
        alert("Error:", err.message);
      });
  };

  const signinUser = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login Successful");
        setTimeout(() => {
          authchange();
        }, 1000);
      })
      .catch((err) => {
        toast.error("Login Failed!");
        console.log("Login not successful:", err);
      });
  };
  const signout = () => {
    signOut(auth)
      .then((res) => {
        toast.success("Logout Successful");
        authchange();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const authchange = () => {
    auth.onAuthStateChanged((user) => {
      setislogedin(user && user.uid ? true : false);
      setuser(user);
    });
    return { logedin, user };
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUser,
        signinUser,
        signout,
        authchange,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
