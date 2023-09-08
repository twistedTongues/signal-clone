import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Optionally import the services that you want to use
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTq85QtydioW6sGREfESt7O2umYjcgPEE",
  authDomain: "signal-clone-302b3.firebaseapp.com",
  projectId: "signal-clone-302b3",
  storageBucket: "signal-clone-302b3.appspot.com",
  messagingSenderId: "157694644467",
  appId: "1:157694644467:web:9417c64064ef3825c56786",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
