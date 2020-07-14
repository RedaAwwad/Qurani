import firebase from "firebase";

const fbConfig = {
    apiKey: "AIzaSyAw65lexXhUbN_BtW0r8nXLHxh5TItT8zA",
    authDomain: "qurani-3dc88.firebaseapp.com",
    databaseURL: "https://qurani-3dc88.firebaseio.com",
    projectId: "qurani-3dc88",
    storageBucket: "qurani-3dc88.appspot.com",
    messagingSenderId: "41288208090",
    appId: "1:41288208090:web:950fe83b5c8b7f42551fe3",
    measurementId: "G-PF6PT046GF",
};

firebase.initializeApp(fbConfig);

export default firebase;