import firebase from "firebase";

const fbConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
};

firebase.initializeApp(fbConfig);

export default firebase;
