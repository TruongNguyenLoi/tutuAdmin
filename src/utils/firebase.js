import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyCRD-pj7Jba2UuxS-xV9KsAzKYMtfPGTuo",
  // authDomain: "datn-ecommerce.firebaseapp.com",
  // projectId: "datn-ecommerce",
  // storageBucket: "datn-ecommerce.appspot.com",
  // messagingSenderId: "658502476447",
  // appId: "1:658502476447:web:089dfe221f139b9e6178aa",
  // measurementId: "G-J7S9K5BND0"
  apiKey: "AIzaSyBPCAnqPI769HcFehN1mhfmIbGGxCoOsl4",
  authDomain: "tutu-365b2.firebaseapp.com",
  projectId: "tutu-365b2",
  storageBucket: "tutu-365b2.appspot.com",
  messagingSenderId: "684885585008",
  appId: "1:684885585008:web:74b63c8ab67620b72698b5",
  measurementId: "G-9FDGYZ0GX0",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
