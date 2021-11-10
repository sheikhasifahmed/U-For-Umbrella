import firebaseConfig from "./FirebaseConfigure";
import { initializeApp } from "firebase/app";

const initializeAuthentication = () => {
  return initializeApp(firebaseConfig);
};

export default initializeAuthentication;
