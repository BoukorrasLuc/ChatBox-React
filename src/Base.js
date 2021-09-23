import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBYFEZC5NF__bHTB7d_jd88N1RziVqEZ78",
  authDomain: "chatbox-react-a439e.firebaseapp.com",
  databaseURL:
    "https://chatbox-react-a439e-default-rtdb.europe-west1.firebasedatabase.app",
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };

export default base;
