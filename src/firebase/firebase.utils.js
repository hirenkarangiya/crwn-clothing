import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAfD7vPMUGq1zWh5Cwvf8ZeCc2iz5q9oSo",
  authDomain: "crwn-db-f88d6.firebaseapp.com",
  // databaseURL: "https://crwn-db-f88d6.firebaseio.com",
  projectId: "crwn-db-f88d6",
  storageBucket: "crwn-db-f88d6.appspot.com",
  messagingSenderId: "613246672619",
  appId: "1:613246672619:web:15bf63d503c649393668ae",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {

  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get()

  if(!snapShot.exists) {

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{

      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })

    } catch (error) {
      console.log('error creating user ', error.message);
    }

  }

  return userRef;

}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;