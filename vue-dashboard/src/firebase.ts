import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBw5tCbFS1vhqIkFITzkkC9pDQegcxKRo",
  authDomain: "personal-dashboard-c6b3f.firebaseapp.com",
  projectId: "personal-dashboard-c6b3f",
  storageBucket: "personal-dashboard-c6b3f.appspot.com",
  messagingSenderId: "394231424123",
  appId: "1:394231424123:web:59127b96bfdbe222496ede",
};

initializeApp(firebaseConfig);

function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
}

export { getCurrentUser };
