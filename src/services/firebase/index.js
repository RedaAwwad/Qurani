import firebase from './init';

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
  
  await db.collection(collectionName).doc(doc).onSnapshot(docSnapshot => {
    console.log(`Received doc snapshot:`);
    // console.log(docSnapshot.data()['name'])
    data = docSnapshot.data();
  }, err => {
    console.log(`Encountered error: ${err}`);
  });
//   .then(doc => {

//     if (doc.exists) data = doc.data();
      
//     else data = "No such document!";

// }).catch(error => console.log("Error getting document:", error));

  return data;

}

async function updateDataCollection(collectionName, doc, data) {
  return await db.collection(collectionName).doc(doc).update(data);
}

async function logOut() {
  return await firebase.auth().signOut();
}


export { firebase,  db, setDataCollection, getDataCollection, updateDataCollection, logOut}; 

