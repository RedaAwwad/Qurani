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

const db = firebase.firestore();

async function setDataCollection(collectionName, userId, data) {
  let result = {}
    await db.collection(collectionName)
      .doc(userId)
      .set(data)
      .then(() => {
        result = {
          status: true,
          success: 'تم التسجيل بنجاح'
        }
        
      })
      .catch((error) => {
        console.error("Error writing document: ", error.message);
        result = {
          status: false,
          error: error,
        };
      });
  return result;
}

async function getDataCollection(collectionName, doc) {
  let data = {};
  
  await db.collection(collectionName).doc(doc).get()
  .then(doc => {

    if (doc.exists) data = doc.data();
      
    else data = "No such document!";

}).catch(error => console.log("Error getting document:", error));

  return data;

}

async function updateDataCollection(collectionName, doc, data) {
  let response = {};
  
  await db.collection(collectionName).doc(doc).update(data)
  .then(_ => {

  response = 'تم التحديث بنجاح';

}).catch(error => console.log("Error getting document:", error));

  return response;

}


export { firebase,  db, setDataCollection, getDataCollection, updateDataCollection}; 

