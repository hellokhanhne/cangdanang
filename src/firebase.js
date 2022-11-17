import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbrcL9BkeqDfqUGo5uBypca_dwk4SbPFE",
  authDomain: "cangdanang-5bd3c.firebaseapp.com",
  projectId: "cangdanang-5bd3c",
  storageBucket: "cangdanang-5bd3c.appspot.com",
  messagingSenderId: "1045434303441",
  appId: "1:1045434303441:web:9ab789d226d2d4183996f0",
  measurementId: "G-VTLT24WR8V",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { db, auth, storage };
