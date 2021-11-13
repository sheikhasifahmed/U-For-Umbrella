import { useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import initializeAuthentication from "./initialization";

initializeAuthentication();

function useFirebase() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const auth = getAuth();

  const signWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  function registerWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function loginWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function updateUserName(displayName) {
    updateProfile(auth.currentUser, {
      displayName: displayName,
    }).then(() => {});
  }

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
  }, []);

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user.email) {
      fetch(`https://backend-umbrella-asif.herokuapp.com/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0]?.role === "Admin") setAdmin(true);
          setIsAdminLoading(false);
        })
        .catch((error) => alert("Ops! Something went wrong..."));
    }
  }, [user.email]);

  return {
    user,
    signWithGoogle,
    registerWithEmail,
    loginWithEmail,
    updateUserName,
    logOut,
    isLoading,
    admin,
    isAdminLoading,
  };
}

export default useFirebase;
