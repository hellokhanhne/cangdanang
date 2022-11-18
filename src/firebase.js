import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCObY5WUTXy0t1v8tUlRi2jCvdnv6B4MBw",
  authDomain: "cangdanang2022-44f46.firebaseapp.com",
  projectId: "cangdanang2022-44f46",
  storageBucket: "cangdanang2022-44f46.appspot.com",
  messagingSenderId: "317251895197",
  appId: "1:317251895197:web:539e2824ecbe334717f974",
  measurementId: "G-WVFL5E2P2V",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { db, auth, storage };
