// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBg9ywZ_Vcw7d75R6-gAQ7ewOj403kxveM",
    authDomain: "todo-73be5.firebaseapp.com",
    projectId: "todo-73be5",
    storageBucket: "todo-73be5.appspot.com",
    messagingSenderId: "1031542268697",
    appId: "1:1031542268697:web:1580421d3075c9df739b88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const saveTask = (task, description) => {
    addDoc(collection(db, 'tasks'), {
        task,
        description,
        createdAt: new Date()
    });
}

export const getTasks = () => {
    return getDocs(collection(db, 'tasks'));
}

export const onTasks = (cb) => {
    onSnapshot(collection(db, 'tasks'), cb);
}